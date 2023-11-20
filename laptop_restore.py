from models import Protocol, Laptop, engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import update


class LaptopOperation():

    def restore(protocol_id, restore_value):
        Session = sessionmaker(bind=engine)
        session = Session()

        if restore_value == 1:
            restore_value = "New"
        else:
            return "error"

        id_laptop_to_update = session.query(Protocol.laptop_id).filter_by(
            id=protocol_id).first()

        stmt = update(Laptop).where(
            Laptop.id == id_laptop_to_update[0]).values(status=restore_value)
        session.execute(stmt)
        session.commit()
