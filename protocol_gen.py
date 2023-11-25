import tempfile
from datetime import datetime
from unidecode import unidecode
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import gray
from reportlab.pdfbase import pdfmetrics
from reportlab.lib.pagesizes import letter
from flask import send_file, make_response
from reportlab.pdfbase.ttfonts import TTFont


def generate_pdf(model_laptop, serial_number, worker, type, protocolid, charger_status):
    current_date = datetime.now().strftime("%d/%m/%y")

    if type == "receiving":
        sentence = f"Ja {worker} odbieram poniższy sprzęt: "
        header = "Protokół odbiorczy"
        protocol_status = "odbiorczy"
    elif type == "delivery":
        sentence = f"Ja {worker} zdaję poniższy sprzęt: "
        header = "Protokół zdawczy"
        protocol_status = "zdawczy"

    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as temp_file:
        pdf_name = temp_file.name

        c = canvas.Canvas(pdf_name, pagesize=letter)

        font_path = "DejaVuSans.ttf"
        pdfmetrics.registerFont(TTFont("DejaVuSans", font_path))
        c.setFont("DejaVuSans", 25)

        c.drawCentredString(4.25 * inch, 10.5 * inch - 0.5 * inch, header)

        c.setFont("DejaVuSans", 13)
        c.drawString(1 * inch, 10.5 * inch - 1.75 * inch, sentence)
        c.drawString(1 * inch, 10.5 * inch - 2.25 *
                     inch, f"Model: {model_laptop}")
        c.drawString(1 * inch, 10.5 * inch - 2.5 * inch,
                     f"Numer Seryjny: {serial_number}")
        c.drawString(1 * inch, 10.5 * inch - 2.75 *
                     inch, f"Data: {current_date}")

        wydajacy_x = 1.5 * inch - \
            c.stringWidth("Przyjmujący:", "DejaVuSans", 13) / 2
        wydajacy_y = 1.5 * inch

        odbiorca_x = letter[0] - \
            c.stringWidth("Odbierający:", "DejaVuSans", 13) - 1.5 * inch
        odbiorca_y = 1.5 * inch

        c.drawString(wydajacy_x, wydajacy_y, "Zdający:")
        c.drawString(odbiorca_x, odbiorca_y, "Odbierający:")

        c.setDash(1, 2)
        c.line(wydajacy_x, wydajacy_y - 0.25 * inch,
               wydajacy_x + 1.5 * inch, wydajacy_y - 0.25 * inch)
        c.line(odbiorca_x, odbiorca_y - 0.25 * inch,
               odbiorca_x + 1.5 * inch, odbiorca_y - 0.25 * inch)

        date_line_y = 10.5 * inch - 3 * inch
        c.line(1 * inch, date_line_y, letter[0] - 1 * inch, date_line_y)

        if charger_status == "1":
            c.setFont("DejaVuSans", 13)
            c.drawString(1 * inch, date_line_y - 0.5 * inch, "*ładowarka")

        c.setFont("DejaVuSans", 13)
        c.drawString(1 * inch, date_line_y - 0.8 * inch, "*mysz")

        c.setFont("DejaVuSans", 13)
        c.drawString(1 * inch, date_line_y - 1.1 * inch, "*klawiatura")

        c.setFillColor(gray)
        c.setFont("DejaVuSans", 10)
        c.drawCentredString(4.25 * inch, 0.5 * inch,
                            "Sprzęt pozostaje własnością TelForceOne S.A")

        right_bottom_x = letter[0] - 0.1 * inch
        right_bottom_y = 0.1 * inch
        c.drawRightString(right_bottom_x, right_bottom_y, f"{protocolid}")

        c.showPage()
        c.save()

    worker = unidecode(worker)
    response = make_response(send_file(pdf_name, as_attachment=True))
    response.headers[
        "Content-Disposition"] = f"attachment; filename=Protokol_{protocol_status}_{worker}_{protocolid}.pdf"
    return response
