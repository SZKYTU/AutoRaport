from flask import Flask, render_template, request, jsonify
from sqlalchemy.orm import sessionmaker
from models import Protocol, Laptop, engine
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()


@app.route('/laptop')
def laptops():
    return render_template('laptops.html')

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


if __name__ == "__main__":
    app.run()
