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

    def laptop_utilization(laptop_id):
        Session = sessionmaker(bind=engine)
        session = Session()

        laptop_to_utilization = session.query(Laptop).filter_by(
            id=laptop_id).first()
        print(laptop_to_utilization.status)

        if laptop_to_utilization.status == "New":  # check if laptop is in use
            try:
                update_query = update(Laptop).where(
                    Laptop.id == laptop_id).values(status="utilization")
                session.execute(update_query)
                session.commit()
                return ({'success': 'utilization laptop success'})
            except SQLAlchemyError as e:
                print("Database error: (/laptops/utilization)", e)
            finally:
                session.close()
        else:
            return "Laptop in use"

    def laptop_company_update(laptop_id, company):
        Session = sessionmaker(bind=engine)
        session = Session()
        company_list = ['TelForceOne', "MpTech", "Momi", "R2", "Teletorium"]

        if company in company_list:  # validation company name
            try:
                update_query = update(Laptop).where(
                    Laptop.id == laptop_id).values(company=company)
                session.execute(update_query)
                session.commit()
                return ({'success': 'company update success'})
            except SQLAlchemyError as e:
                print("Database error: (/laptops/company)", e)
            finally:
                session.close()
        else:
            return "Invalid company name"

    # def laptop_to_protocol_generate(laptop_id, user_id):
