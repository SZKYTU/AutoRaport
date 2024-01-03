from datetime import datetime
from sqlalchemy import update, select, literal_column, and_, exists
from unidecode import unidecode
from protocol_gen import generate_pdf
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import IntegrityError
from werkzeug.utils import secure_filename
from models import Protocol, Laptop, engine, User
from sqlalchemy.ext.declarative import declarative_base
from flask import Flask, render_template, request, jsonify, abort, make_response, redirect, url_for
from laptop_restore import LaptopOperation
from laptop_list_module import LaptopList

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024


# Page servis

@app.errorhandler(404)
def page_not_found(error):
    return redirect(url_for('start'))


@app.route('/start')
def start():
    return render_template('index.html')


@app.route('/laptops/list')
def laptop_list():
    return render_template('laptop_list_form.html')


@app.route('/laptop/panel/<int:laptop_id>')
def laptop_panel(laptop_id):
    return f'{laptop_id}'


@app.route('/laptop')
def laptops():
    return render_template('laptops.html')


@app.route('/protocol')
def protocol():
    return render_template('protocol.html')


@app.route('/protocols/list')
def protosols_list():
    return render_template('protocol_list.html')


@app.route('/protocol/view/<int:protocol_id>', methods=['GET'])
def get_protocol_view(protocol_id):
    return render_template('protocol_form.html', protocol_id=protocol_id)


# API servis

@app.route('/laptops/list/get/<int:status>', methods=['GET'])
def get_laptop_list(status): 
    laptop_dict = LaptopList.get_laptop_list(status)
    return jsonify(laptop_dict)


@app.route('/laptops/add', methods=['POST'])
def add_laptop():
    data = request.get_json()

    laptop = Laptop(
        serial_number=data['serial_number'],
        model=data['model'],
        coment=data['coment'],
        company=data['company'],
        status=data['status']
    )
    session = Session()

    result = session.query(Laptop).filter(
        and_(Laptop.serial_number == laptop.serial_number, Laptop.company == laptop.company, Laptop.status == 'New')).all()

    if len(result) > 0:
        print("true")
        return jsonify({'success': False, 'message': 'laptopExist'})
    else:
        session.add(laptop)
        session.commit()
        return jsonify({'success': True, 'message': 'success'})


@app.route('/protocol/users', methods=['GET'])
def get_users():
    domain_login = request.args.get('domain_login')
    users = session.query(User).filter_by(domain_login=domain_login).all()
    users_dict = [{'id': user.id, 'name': user.name, 'l_name': user.l_name,
                   'domain_login': user.domain_login} for user in users]
    print(f"latopt {users_dict}")
    return jsonify(users_dict)


@app.route('/protocol/laptops', methods=['GET'])
def get_laptops():
    company = request.args.get('company')
    laptops = session.query(Laptop).filter(
        Laptop.company == company, Laptop.status == 'New').all()
    laptops_dict = [{'id': laptop.id, 'serial_number': laptop.serial_number, 'model': laptop.model,
                     'coment': laptop.coment, 'company': laptop.company, 'status': laptop.status} for laptop in laptops]
    print(f"laptop {laptops_dict}")
    return jsonify(laptops_dict)


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
def protoco_return():
    data = request.get_json()
    # data == [user.id, laptop.id, chargerStatus, mouse_keyboard_status] ...carbonara
    if not data:
        return jsonify({'error': 'response error'}), 400
    if len(data) != 4:
        return jsonify({'error': 'response error (array)'}), 400

    user = session.query(User).get(data[0])

    protocol = Protocol(date=datetime.now(),
                        last_name=user.l_name,
                        laptop_id=data[1],
                        user_id=data[0],
                        charger=data[2],
                        mouse_keyboard_status=data[3],
                        coment='No comments',
                        scan_receiving=b'None',
                        scan_delivery=b'None')

    try:
        session.add(protocol)

        session.execute(update(Laptop).where(
            Laptop.id == data[1]).values(status=0))

        session.commit()
        return jsonify({'success': 'success'})
    except IntegrityError:
        session.rollback()
        return jsonify({'error': 'invalid data'})


@app.route('/protocols/show', methods=['GET'])
def get_protocols():
    protocols = session.query(Protocol).order_by(Protocol.date.desc()).all()
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


@app.route('/protocol/<int:protocol_id>', methods=['GET'])
def get_protocol(protocol_id):
    session = Session()
    protocol = session.query(Protocol).filter(
        Protocol.id == protocol_id).first()
    laptop = session.query(Laptop).filter(
        Laptop.id == protocol.laptop_id).first()
    session.close()
    if protocol:
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
        return jsonify({'message': 'Protocol not found'}), 404

# TODO:


@app.route('/protocol/upload/<int:protocol_id>/<string:type>/<int:restore>', methods=['GET', 'POST'])
def protocol_upload(protocol_id, type, restore):
    file = request.files['file']

    if file and allowed_file(file.filename):
        if file.content_length > app.config['MAX_CONTENT_LENGTH']:
            return 'File size exceeds the limit. Max size allowed is 1 MB.'

        filename = secure_filename(file.filename)
        if filename.endswith('.pdf'):
            file_data = file.read()
            session = Session()
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


# FIXME:


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
    # ...
    name = session.query(User.name).filter(User.id == protocol.user_id).first()
    if type == 'receiving':
        response = generate_pdf(protocol.laptop.model, protocol.laptop.serial_number,
                                protocol.last_name + " " + name.name, "receiving", protocol_id, protocol.charger)
    elif type == 'delivery':
        response = generate_pdf(protocol.laptop.model, protocol.laptop.serial_number,
                                protocol.last_name + " " + name.name, "delivery", protocol_id, protocol.charger)

    else:
        abort(400, "Invalid argument!")
    session.close()
    return response


if __name__ == '__main__':
    app.run(port=5001, host="0.0.0.0")
