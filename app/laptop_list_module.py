from flask import Flask, jsonify
from app.models import Laptop
from sqlalchemy.orm import sessionmaker
from app.models import engine

Session = sessionmaker(bind=engine)
session = Session()


class LaptopList:
    # gets list of laptops with status
    def get_laptop_list(status):
        laptop_query = ''
        if status == True:
            laptop_query = session.query(Laptop).all()
        elif status == False:
            laptop_query = session.query(Laptop).filter(
                Laptop.status == 'New').all()
        else:
            return 'Invalid status'

        laptop_dict = [{'id': laptop.id, 'serial_number': laptop.serial_number, 'model': laptop.model,
                        'company': laptop.company, 'status': laptop.status} for laptop in laptop_query]

        return laptop_dict
