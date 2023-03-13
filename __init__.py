from flask import Flask, render_template, request, jsonify
from sqlalchemy.orm import sessionmaker
from models import Protocol, Laptop, engine, User
from sqlalchemy.ext.declarative import declarative_base
import requests

app = Flask(__name__)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


@app.route('/laptop')
def laptops():
    return render_template('laptops.html')

@app.route('/protocol')
def protocol():
    return render_template('protocol.html')

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
    nazwisko = request.args.get('nazwisko')
    users = session.query(User).filter_by(nazwisko=nazwisko).all()
    users_dict = [{'id': user.id, 'imie': user.imie,
                   'nazwisko': user.nazwisko} for user in users]
    return jsonify(users_dict)

if __name__ == "__main__":
    app.run()
