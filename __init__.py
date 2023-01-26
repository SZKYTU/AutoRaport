from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import sessionmaker
from models import Protocol, engine
from sqlalchemy.ext.declarative import declarative_base

app = Flask(__name__)

Session = sessionmaker(bind=engine)
session = Session()
Base = declarative_base()

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/protocols', methods=['POST'])
def add_protocol():
    data = request.get_json()
    first_name = data['first_name']
    last_name = data['last_name']
    comment = data['comment']
    new_protocol = Protocol(first_name=first_name,
                            last_name=last_name, comment=comment)
    session.add(new_protocol)
    session.commit()
    return jsonify({"message": "Protocol added successfully."}), 201

if __name__ == "__main__":
    app.run()
