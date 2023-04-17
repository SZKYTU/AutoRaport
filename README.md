# AutoRaport

Project for generating delivery/acceptance protocols and storing hardware states in a company.

## Description

This is a Python application based on the Flask framework and MSSQL database, allowing for the generation and storage of hardware delivery and acceptance protocols, as well as hardware statuses. With this application, individuals responsible for issuing hardware (e.g. IT employees in a company) can easily create and manage protocols and monitor hardware statuses, enabling more efficient and transparent hardware management and greater organization within the company.

## Installation

To install the program, follow these steps:

1. Clone the repository to your computer:
```
git clone git@github.com:SZKYTU/AutoRaport.git
```
3. Run the "make deps" command to install the required dependencies:
```
make deps
```

4. Fill in your data in the configuration file "config.py":
```
nano .env
```

5. Run the program using the "make run" command:

```
make run
```

## Usage

After running the program, you can use the following functionalities:

- Generating delivery/acceptance protocols
- Storing protocols in a database
- Storing hardware states in a company

## Authors

The project was created by SZKYTU 🖤.

