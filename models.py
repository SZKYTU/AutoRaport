from sqlalchemy import create_engine, Column, Integer, String, Date, Text
from sqlalchemy.ext.declarative import declarative_base

from dotenv import load_dotenv
load_dotenv()

engine = create_engine(f'mssql+pyodbc://{os.getenv("DB_USER")}:{os.getenv("DB_PASS")}@{os.getenv("DB_HOST")}/{os.getenv("DB_NAME")}')

Base = declarative_base()

class Protocol(Base):
    __tablename__ = 'protocols'

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    first_name = Column(String(50), nullable=False)
    last_name = Column(String(50), nullable=False)
    model = Column(String(50), nullable=False)



class Laptop(Base):
    __tablename__ = 'laptops'

    id = Column(Integer, primary_key=True)
    serial_number = Column(String(50), nullable=False)
    model = Column(String(50), nullable=False)
    status = Column(String(50), nullable=False)
    comment = Column(Text)


Base.metadata.create_all(bind=engine)


