FROM python:3.11

COPY . /app

RUN pip install -r requirements.txt

EXPOSE 8080

CMD ["python", "__init__.py"]

