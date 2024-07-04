from flask import request, jsonify, render_template, make_response, abort
from sqlalchemy import and_, update
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from datetime import datetime
from werkzeug.utils import secure_filename
from unidecode import unidecode
from app.models import Laptop, Protocol, User
from app.laptop_list_module import LaptopList
from app.laptop_operation import LaptopOperation
from app.protocol_gen import generate_pdf
from app import app, session


@app.route('/laptops/list/get/<int:status>', methods=['GET'])
def get_laptop_list(status):
    laptop_dict = LaptopList.get_laptop_list(status)
    return jsonify(laptop_dict)


@app.route('/laptops/add', methods=['POST'])
def add_laptop():
    return LaptopOperation.add_laptop()


@app.route('/laptop/utilization/<int:laptop_id>', methods=['DELETE'])
def laptop_utilization(laptop_id):
    return jsonify(
        LaptopOperation.laptop_utilization(laptop_id))


@app.route('/laptop/update/<int:laptop_id>/<string:company>', methods=['PUT'])
def laptop_company_update(laptop_id, company):
    return jsonify(LaptopOperation.laptop_company_update(laptop_id, company))


@app.route('/protocol/users', methods=['GET'])
def get_users():
    try:
        domain_login = request.args.get('domain_login')
        users = session.query(User).filter(
            User.domain_login.like(f"{domain_login}%")).all()

        users_dict = [{'id': user.id, 'name': user.name, 'l_name': user.l_name,
                       'domain_login': user.domain_login} for user in users]
        return jsonify(users_dict)
    except SQLAlchemyError as e:
        print("Database error: (/protocol/users)", e)
    finally:
        session.close()


@app.route('/protocol/laptops', methods=['GET'])
def get_laptops():
        try:
            company = request.args.get('company')
            laptops = session.query(Laptop).filter(
                Laptop.company == company, Laptop.status == 'New').all()
            laptops_dict = [{'id': laptop.id, 'serial_number': laptop.serial_number, 'model': laptop.model,
                            'coment': laptop.coment, 'company': laptop.company, 'status': laptop.status}
                            for laptop in laptops]
            return jsonify(laptops_dict)

        except SQLAlchemyError as e:
            print("Database error: (/protocol/laptops)", e)

        finally:
            session.close()


@app.route('/protocol/status/<int:protocol_id>', methods=['GET'])
def get_protocol_status(protocol_id):
    protocol_status = session.query(Protocol.receiving_status, Protocol.delivery_status).filter(
        Protocol.id == protocol_id).first()
    status_dict = {
        'id': protocol_id,
        'receiving_status': protocol_status[0],
        'delivery_status': protocol_status[1]
    }
    return jsonify(status_dict)


@app.route('/protocol/return', methods=['POST'])
def protocol_return():
    data = request.get_json()

    print(data)
    required_keys = ['user_id', 'laptop_id', 'charger', 'mouse_keyboard_status', 'laptop_bag_status']
    if not data or not all(key in data for key in required_keys):
        return jsonify({'error': 'response error (keys)'}), 400
    print(data)

    try:
        user = session.query(User).get(data['user_id'])

        protocol = Protocol(date=datetime.now(),
                            last_name=user.l_name,
                            laptop_id=data['laptop_id'],
                            user_id=data['user_id'],
                            charger=data['charger'],
                            mouse_keyboard_status=data['mouse_keyboard_status'],
                            coment='No comments',
                            scan_receiving=b'None',
                            scan_delivery=b'None')
        session.add(protocol)

        session.execute(update(Laptop).where(
            Laptop.id == data['laptop_id']).values(status=0))

        session.commit()

        return jsonify({'success': 'success'})

    except IntegrityError:
        session.rollback()
        print('error', 'An error occurred/ rollback')
        return jsonify({'error': 'integrity error'}), 500

    except Exception as e:
        session.rollback()
        print('error', 'An error occurred', e)
        return jsonify({'error': 'unknown error'}), 500

    finally:
        session.close()




@app.route('/protocols/show', methods=['GET'])
def get_protocols():
    try:
        protocols = session.query(Protocol).order_by(
            Protocol.date.desc()).all()
        results = []
        for protocol in protocols:
            result = {
                'id': protocol.id,
                'last_name': protocol.last_name,
                'date': protocol.date.strftime('%d/%m/%Y'),
                'delivery_status': protocol.delivery_status,
                'receiving_status': protocol.receiving_status,
            }
            results.append(result)
        return jsonify(results)

    except SQLAlchemyError as e:
        print("Database error: (/protocol/show)", e)

    finally:
        session.close()


@app.route('/protocol/<int:protocol_id>', methods=['GET'])
def get_protocol(protocol_id):
    try:
        protocol = session.query(Protocol).filter(
            Protocol.id == protocol_id).first()
        laptop = None
        if protocol:
            laptop = session.query(Laptop).filter(
                Laptop.id == protocol.laptop_id).first()

        if protocol and laptop:
            response_data = {
                'protocol': {
                    'id': protocol.id,
                    'date': protocol.date.strftime('%d/%m/%Y'),
                    'last_name': protocol.last_name,
                    'laptop_id': protocol.laptop_id,
                },
                'laptop': {
                    'serial_number': laptop.serial_number,
                    'model': laptop.model,
                    'company': laptop.company,
                    'status': laptop.status,
                }}
            return jsonify(response_data)
        else:
            return jsonify({'message': 'Protocol or associated laptop not found'}), 404

    except SQLAlchemyError as e:
        print("Database error: (/protocol/id)", e)

    finally:
        session.close()


@app.route('/protocol/upload/<int:protocol_id>/<string:type>/<int:restore>', methods=['GET', 'POST'])
def protocol_upload(protocol_id, type, restore):
    file = request.files['file']

    if file and allowed_file(file.filename):
        if file.content_length > app.config['MAX_CONTENT_LENGTH']:
            return 'File size exceeds the limit. Max size allowed is 1 MB.'

        filename = secure_filename(file.filename)

        if filename.endswith('.pdf'):
            file_data = file.read()

            protocol = session.query(Protocol).filter_by(
                id=protocol_id).first()
            if protocol:
                if type == 'receiving':
                    protocol.scan_receiving = file_data
                    protocol.receiving_status = 1
                elif type == 'delivery':
                    LaptopOperation.restore(protocol_id, restore)
                    protocol.scan_delivery = file_data
                    protocol.delivery_status = 1
                else:
                    abort(400, "Invalid argument!")
                session.commit()
                session.close()
                return render_template('load.html')
            else:
                return f'Protocol with id={protocol_id} not found.'

    return 'Invalid file. Only PDF files are allowed.'


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'pdf'


@app.route('/protocol/download/<int:protocol_id>/<string:type>', methods=['GET', 'POST'])
def protocol_download(protocol_id, type):

    protocol = session.query(Protocol).filter(
        Protocol.id == protocol_id).first()
    session.close()

    if type == "receiving":
        response = make_response(protocol.scan_receiving)
    elif type == "delivery":
        response = make_response(protocol.scan_delivery)
    else:
        abort(400, "Invalid argument!")

    file_name = unidecode(protocol.last_name)

    response.headers[
        'Content-Disposition'] = f'attachment; filename=scan - {file_name}.pdf'
    response.headers['Content-Type'] = 'application/pdf'
    return response


@app.route('/protocol/gen/<int:protocol_id>/<string:type>', methods=['GET'])
def gen_protocol(protocol_id, type):
    protocol = session.query(Protocol).filter(
        Protocol.id == protocol_id).first()
    laptop_company = session.query(Laptop.company).filter(
        Laptop.id == protocol.laptop_id).first()
    name = session.query(User.name).filter(User.id == protocol.user_id).first()
    if type == 'receiving':
        response = generate_pdf(protocol.laptop.model, protocol.laptop.serial_number,
                                protocol.last_name + " " + name.name, "receiving", protocol_id, protocol.charger, laptop_company)
    elif type == 'delivery':
        response = generate_pdf(protocol.laptop.model, protocol.laptop.serial_number,
                                protocol.last_name + " " + name.name, "delivery", protocol_id, protocol.charger, laptop_company)

    else:
        abort(400, "Invalid argument!")
    session.close()
    return response
