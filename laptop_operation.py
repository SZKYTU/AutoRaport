from models import Protocol, Laptop, engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import update
from sqlalchemy.exc import SQLAlchemyError


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

    def laptop_delete(laptop_id):
        Session = sessionmaker(bind=engine)
        session = Session()

        laptop_to_delete = session.query(Laptop).filter_by(
            id=laptop_id).first()

        try:
            session.delete(laptop_to_delete)
            # TODO: add if statement to check if laptop is not in use
            session.commit()
            # return jsonify({'success': 'success'}) FIXME: add return
        except SQLAlchemyError as e:
            print("Database error: (/laptops/delete)", e)
        finally:
            session.close()
