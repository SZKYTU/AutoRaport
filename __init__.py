from flask import Flask, render_template, request, jsonify
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from models import Protocol, Laptop, engine, User
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import IntegrityError
from flask_sqlalchemy import SQLAlchemy




app = Flask(__name__)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

@app.route('/start')
def start():
    return render_template('index.html')

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
  session.add(laptop)
  session.commit()

  return jsonify({'success': True, 'message': 'Equipment added successfully!'})


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
    laptops = session.query(Laptop).filter_by(company=company).all()
    laptops_dict = [{'id': laptop.id, 'serial_number': laptop.serial_number, 'model': laptop.model,
                     'coment': laptop.coment, 'company': laptop.company, 'status': laptop.status} for laptop in laptops]
    print(f"latopt {laptops_dict}")
    return jsonify(laptops_dict)


@app.route('/protocol/return', methods=['POST'])
def protoco_return():
    data = request.get_json()
    #data == [user.id, laptop.id, chargerStatus] ...carbonara
    if not data:
        return jsonify({'error': 'response error'}), 400
    if len(data) != 3:
        return jsonify({'error': 'response error (array)'}), 400

    user = session.query(User).get(data[0])

    protocol = Protocol(date=datetime.now(),
                        last_name=user.l_name, 
                        laptop_id=data[1],
                        user_id=data[0], 
                        charger=data[2], 
                        coment='No comments', 
                        scan=b'None')
    
    try:
        session.add(protocol)
        session.commit()
        return jsonify({'success': 'success'})
    except IntegrityError:
        session.rollback()  
        return jsonify({'error': 'invalid data'})


@app.route('/protocols/show', methods=['GET'])
def get_protocols():
    protocols = session.query(Protocol).all()
    results = []
    for protocol in protocols:
        result = {
            'id': protocol.id,
            'last_name': protocol.last_name,
            'date': protocol.date.strftime('%d/%m/%Y'),
            'coment': protocol.coment
        }
        results.append(result)
    return jsonify(results)


@app.route('/protocol/<int:protocol_id>', methods=['GET'])
def get_protocol(protocol_id):
    session = Session()
    protocol = session.query(Protocol).filter(Protocol.id == protocol_id).first()
    laptop = session.query(Laptop).filter(Laptop.id == protocol.laptop_id).first()
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

if __name__ == "__main__":
    app.run()
