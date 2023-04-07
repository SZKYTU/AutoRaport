from reportlab.pdfgen import canvas as pdf_canvas

def generate_pdf(model_laptopa, numer_seryjny, odbiorca, nadawca):
    pdf_name = "protokol.pdf"
    header = "Protokol zdawczo/odbiorczy"
    sentence = f"Ja {odbiorca} odbieram poniższy sprzet"
    
    canvas = pdf_canvas.Canvas(pdf_name)
    canvas.setFont("Helvetica", 14)
    canvas.drawCentredString(300, 750, header)
    canvas.setFont("Helvetica", 12)
    canvas.drawString(50, 700, sentence)
    canvas.drawString(50, 670, f"Model laptopa: {model_laptopa}")
    canvas.drawString(50, 650, f"Numer seryjny: {numer_seryjny}")
    canvas.drawString(50, 600, "Odbiorca:")
    canvas.drawString(200, 600, "Nadawca:")
    canvas.drawString(50, 550, "Podpis:")
    canvas.drawString(200, 550, "Podpis:")
    canvas.showPage()
    canvas.save()

generate_pdf("Asus VivoBook S14", "12345", "Jan Kowalski", "Anna Nowak")
