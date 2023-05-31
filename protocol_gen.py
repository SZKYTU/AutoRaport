from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from flask import send_file
from reportlab.lib.units import inch
from datetime import datetime
import tempfile
from flask import make_response


def generate_pdf(model_laptop, serial_number, pracownik, type, protocolid):
    current_date = datetime.now().strftime("%d/%m/%y")

    if type == "receiving":
        sentence = f"Ja {pracownik} odbieram poniższy sprzęt: "
        header = "Protokoł odbiorczy"
    elif type == "delivery":
        sentence = f"Ja {pracownik} zdaje poniższy sprzęt: "
        header = "Protokoł zdawczy"

    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_file:
        pdf_name = temp_file.name

        c = canvas.Canvas(pdf_name, pagesize=letter)

        c.setFont("Helvetica-Bold", 22)
        c.drawCentredString(4.25*inch, 10.5*inch - 0.5*inch, header)

        c.setFont("Helvetica", 13)
        c.drawString(1*inch, 10.5*inch - 1.75*inch, sentence)
        c.drawString(1*inch, 10.5*inch - 2.25*inch, f"Model: {model_laptop}")
        c.drawString(1*inch, 10.5*inch - 2.5*inch, f"Numer Seryjny: {serial_number}")
        c.drawString(1*inch, 10.5*inch - 2.75*inch, f"Data: {current_date}")

        wydajacy_x = 1 * inch
        wydajacy_y = 1.5 * inch

        odbiorca_x = letter[0] - c.stringWidth("Recipient", "Helvetica", 12) - 1 * inch
        odbiorca_y = 1.5 * inch

        c.drawString(wydajacy_x, wydajacy_y, "Przyjmujący:")
        c.drawString(odbiorca_x, odbiorca_y, "Odbbierający:")

        c.showPage()
        c.save()

    response = make_response(send_file(pdf_name, as_attachment=True))
    response.headers["Content-Disposition"] = f"attachment; filename={protocolid}.pdf"
    return response
