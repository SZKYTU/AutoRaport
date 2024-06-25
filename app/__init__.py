from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from app.models import engine 

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()
app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024


from app import routes
