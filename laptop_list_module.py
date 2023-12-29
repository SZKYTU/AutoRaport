from flask import Flask,jsonify
from models import Laptop
from sqlalchemy.orm import sessionmaker
from models import engine

Session = sessionmaker(bind=engine)
session = Session()

class LaptopList:
    # gets list of laptops with status 'New'
    def get_laptop_list():
        laptops = session.query(Laptop).filter(Laptop.status == 'New').all()
        laptop_dict = [{'id': laptop.id, 'serial_number': laptop.serial_number, 'model': laptop.model, 'company': laptop.company} for laptop in laptops]

        return laptop_dict

       