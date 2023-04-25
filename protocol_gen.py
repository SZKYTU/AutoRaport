from reportlab.pdfgen import canvas as pdf_canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


def generate_pdf(model_laptopa, numer_seryjny, odbiorca, nadawca):
    pdf_name = "protokol.pdf"
    header = "Protokół zdawczo/odbiorczy"
    sentence = f"Ja {odbiorca} odbieram poniższy sprzęt"

    # Rejestracja czcionki Liberation
    pdfmetrics.registerFont(TTFont('LiberationSans', 'LiberationSans-Regular.ttf'))
    pdfmetrics.registerFont(TTFont('LiberationSans-Bold', 'LiberationSans-Bold.ttf'))

    canvas = pdf_canvas.Canvas(pdf_name, pagesize=letter)
    canvas.setFont("LiberationSans-Bold", 16)
    canvas.drawCentredString(4.25*inch, 10.5*inch - 0.5*inch, header)
    canvas.setFont("LiberationSans", 12)
    canvas.drawString(1*inch, 10.5*inch - 1.5*inch, sentence)
    canvas.drawString(1*inch, 10.5*inch - 1.75*inch, f"Model laptopa: {model_laptopa}")
    canvas.drawString(1*inch, 10.5*inch - 2*inch, f"Numer seryjny: {numer_seryjny}")
    canvas.drawString(1*inch, 10.5*inch - 2.25*inch, f"Odbiorca: {odbiorca}")
    canvas.drawString(1*inch, 10.5*inch - 2.5*inch, f"Nadawca: {nadawca}")
    canvas.showPage()
    canvas.save()

generate_pdf("Asus VivoBook S14", "12345", "Jan Kowalski", "Anna Nowak")
