from reportlab.pdfgen import canvas as pdf_canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from datetime import datetime


def generate_pdf(model_laptop, serial_number, pracownik, typ):
    pdf_name = "protocol.pdf"
    header = "Delivery/Receipt Protocol"
    sentence = f"Ja {pracownik} odbieram poniższy sprzęt: "
    current_date = datetime.now().strftime("%d/%m/%y")

    # pdfmetrics.registerFont(
    #     TTFont('LiberationSans', 'LiberationSans-Regular.ttf'))
    # pdfmetrics.registerFont(
    #     TTFont('LiberationSans-Bold', 'LiberationSans-Bold.ttf'))

    canvas = pdf_canvas.Canvas(pdf_name, pagesize=letter)
    canvas.setFont("Helvetica-Bold", 16)
    canvas.drawCentredString(4.25*inch, 10.5*inch - 0.5*inch, header)
    canvas.setFont("Helvetica", 12)
    canvas.drawString(1*inch, 10.5*inch - 1.75*inch, sentence)
    canvas.drawString(1*inch, 10.5*inch - 2.25*inch,
                      f"Laptop Model: {model_laptop}")
    canvas.drawString(1*inch, 10.5*inch - 2.5*inch,
                      f"Serial Number: {serial_number}")
    canvas.drawString(1*inch, 10.5*inch - 2.75*inch,
                      f"Date: {current_date}")

    wydajacy_x = 1 * inch
    wydajacy_y = 1.5 * inch

    odbiorca_x = letter[0] - \
        canvas.stringWidth("Recipient", "Helvetica", 12) - 1 * inch
    odbiorca_y = 1.5 * inch

    canvas.drawString(wydajacy_x, wydajacy_y, "Issuer")
    canvas.drawString(odbiorca_x, odbiorca_y, "Recipient")

    canvas.showPage()
    canvas.save()
