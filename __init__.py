from flask import Flask, render_template, request, jsonify
from sqlalchemy.orm import sessionmaker
from models import Protocol, Laptop, engine
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


@app.route('/protocols', methods=['POST'])
def add_protocol():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    comment = data['comment']
    new_protocol = Protocol(first_name=first_name,
                            last_name=last_name, comment=comment)
    session.add(new_protocol)
    session.commit()
    return jsonify({"message": "Protocol added successfully."}), 201



@app.route('/laptops', methods=['POST'])
def add_laptop():
    data = request.get_json()
    new_laptop = Laptop(serial_number=data['serial_number'], model=data['model'],
                        cement=data['cement'], company=data['company'],
                        status=data['status'])
    session.add(new_laptop)
    session.commit()
    return jsonify({'message': 'Laptop added successfully.'}), 201


@app.route('/laptops/<int:laptop_id>', methods=['GET'])
def get_laptop(laptop_id):
    laptop = Laptop.query.get_or_404(laptop_id)
    laptop_dict = {'id': laptop.id, 'serial_number': laptop.serial_number,
                   'model': laptop.model, 'cement': laptop.cement,
                   'company': laptop.company, 'status': laptop.status}
    return jsonify(laptop_dict)

if __name__ == "__main__":
    app.run()
