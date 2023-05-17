from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from flask import send_file
from reportlab.lib.units import inch
from datetime import datetime
import tempfile
from flask import make_response


def generate_pdf(model_laptop, serial_number, pracownik, typ, protocolid):
    header = "Delivery/Receipt Protocol"
    sentence = f"Ja {pracownik} odbieram poniższy sprzęt: "
    current_date = datetime.now().strftime("%d/%m/%y")

    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_file:
        pdf_name = temp_file.name

        c = canvas.Canvas(pdf_name, pagesize=letter)

        c.setFont("Helvetica-Bold", 16)
        c.setFont("Helvetica", 12)

        # Rysowanie treści dokumentu
        c.drawCentredString(4.25*inch, 10.5*inch - 0.5*inch, header)
        c.drawString(1*inch, 10.5*inch - 1.75*inch, sentence)
        c.drawString(1*inch, 10.5*inch - 2.25*inch, f"Laptop Model: {model_laptop}")
        c.drawString(1*inch, 10.5*inch - 2.5*inch, f"Serial Number: {serial_number}")
        c.drawString(1*inch, 10.5*inch - 2.75*inch, f"Date: {current_date}")

        wydajacy_x = 1 * inch
        wydajacy_y = 1.5 * inch

        odbiorca_x = letter[0] - c.stringWidth("Recipient", "Helvetica", 12) - 1 * inch
        odbiorca_y = 1.5 * inch

        c.drawString(wydajacy_x, wydajacy_y, "Issuer")
        c.drawString(odbiorca_x, odbiorca_y, "Recipient")

        c.showPage()
        c.save()

    response = make_response(send_file(pdf_name, as_attachment=True))
    response.headers["Content-Disposition"] = f"attachment; filename={protocolid}.pdf"
    return response