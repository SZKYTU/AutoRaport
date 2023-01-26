from sqlalchemy import create_engine, Column, Integer, String, Date, Text,ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import text


import os
from dotenv import load_dotenv
load_dotenv()

engine = create_engine(f'mssql+pyodbc://{os.getenv("DB_USER")}:{os.getenv("DB_PASS")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}')

Base = declarative_base()

class Protocol(Base):
    __tablename__ = 'protocols'

    id = Column(Integer, primary_key=True)
    date = Column(Date, default=text('CURRENT_TIMESTAMP'))
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    laptops = relationship("Laptop", backref="protocol")
    charger = Column(Boolean, default=False)
    comment = Column(String(250))



class Laptop(Base):
    __tablename__ = 'laptops'

    id = Column(Integer, primary_key=True)
    serial_number = Column(String(50), nullable=False)
    protocol_id = Column(Integer, ForeignKey('protocols.id'), nullable=False)
    model = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False)
    comment = Column(Text)


Base.metadata.create_all(bind=engine)


