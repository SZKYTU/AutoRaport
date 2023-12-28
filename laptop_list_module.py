from sqlalchemy.orm import session
from models import Laptop


class LaptopList:
    def get_laptop_list(self, company,status):

        status = "New" if status == 0 else "0"


        laptops = session.query(Laptop).filter(
            Laptop.company == company, Laptop.status == status).all()

