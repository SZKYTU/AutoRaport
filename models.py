from sqlalchemy import create_engine, Column, Integer, String, Date, Text, ForeignKey, DateTime, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text

import os
import pyodbc
from dotenv import load_dotenv

load_dotenv()

conn = pyodbc.connect(
    driver='{ODBC Driver 17 for SQL Server}',
    server=os.getenv('DB_HOST'),
    database=os.getenv('DB_NAME'),
    uid=os.getenv('DB_USER'),
    pwd=os.getenv('DB_PASS')
)

engine = create_engine('mssql+pyodbc://', creator=lambda: conn)

Base = declarative_base()


class Laptop(Base):
    __tablename__ = 'laptops'

    id = Column(Integer, primary_key=True)
    serial_number = Column(String(50), nullable=False)
    model = Column(String(50), nullable=False)
    cement = Column(String(50))
    company = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False)


class Protokol(Base):
    __tablename__ = 'protocols'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    laptop_id = Column(Integer, ForeignKey('laptops.id'), nullable=False)
    charger = Column(String(50))
    coment = Column(String(200))
    scan = Column(LargeBinary)
    laptop = relationship("Laptop")


Base.metadata.create_all(engine)
