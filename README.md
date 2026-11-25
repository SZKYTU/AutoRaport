# AutoRaport
 
Web application for generating equipment handover/return protocols and tracking the state of company hardware.
 
## Description
 
AutoRaport is a Python application built on Flask, SQLAlchemy and MSSQL. It lets the people responsible for issuing hardware (e.g. IT staff) register laptops, generate handover and return protocols as PDF files, store scans of the signed protocols and track equipment status. It is in production use at TelForceOne S.A.
 
## Features
 
- Registering laptops (serial number, model, company, status)
- Generating handover/return protocols as PDF
- Uploading and downloading scans of signed protocols
- Browsing the protocol history
## Requirements
 
- Python 3.10+
- Microsoft SQL Server
- `DejaVuSans.ttf` font in the project root (used for PDF generation, with support for Polish characters). Download it from https://dejavu-fonts.github.io/
## Installation
 
1. Clone the repository:
```
git clone git@github.com:SZKYTU/AutoRaport.git
cd AutoRaport
```
2. Install the dependencies:
```
make deps
```
3. Create a `.env` file based on `.env.example` and fill in your database credentials:
```
cp .env.example .env
nano .env
```
4. Copy `DejaVuSans.ttf` into the project root.
5. Run the application:
```
make run
```
   The app starts at `http://localhost:5000/start`.
 
## License
 
Apache 2.0. See [LICENSE](LICENSE).
 
## Author
 
Created and maintained by [SZKYTU](https://github.com/SZKYTU) 🖤
 
