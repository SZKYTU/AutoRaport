from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, LargeBinary
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import relationship
from dotenv import load_dotenv
import os

load_dotenv()

server = os.getenv('DB_HOST')
database = os.getenv('DB_NAME')
uid = os.getenv('DB_USER')
pwd = os.getenv('DB_PASS')
port = os.getenv('DB_PORT')


engine = create_engine(
    f'mssql+pymssql://{uid}:{pwd}@{server}:{port}/{database}?charset=utf8')
    # f'mssql+pymssql://{uid}:{pwd}@localhost:1433/{database}')
Base = declarative_base()


class Laptop(Base):
    __tablename__ = 'laptops'

    id = Column(Integer, primary_key=True)
    serial_number = Column(String(50), nullable=False)
    model = Column(String(50), nullable=False)
    coment = Column(String(50))
    company = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False)


class Protocol(Base):
    __tablename__ = 'protocols'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    last_name = Column(String(50), nullable=False)
    laptop_id = Column(Integer, ForeignKey('laptops.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    charger = Column(String(50))
    coment = Column(String(200))
    scan_receiving = Column(LargeBinary)
    scan_delivery = Column(LargeBinary)
    laptop = relationship("Laptop")

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    mmd_id = Column(Integer, nullable=False)
    name = Column(String(50), nullable=False)
    l_name = Column(String(50), nullable=False)
    domain_login = Column(String(50), nullable=False)


Base.metadata.create_all(engine)
