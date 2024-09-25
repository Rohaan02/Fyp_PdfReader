import sys
import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path):
    # Open the PDF
    doc = fitz.open(pdf_path)
    text = ""
    
    # Iterate through the pages
    for page_num in range(doc.page_count):
        page = doc.load_page(page_num)
        text += page.get_text("text")
    
    return text

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    extracted_text = extract_text_from_pdf(pdf_path)
    
    # Output the extracted text (this will be captured by the exec call in Node.js)
    print(extracted_text)
