import os
import sys
import fitz  # PyMuPDF
import io
from PIL import Image
import base64
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv()

# Initialize OpenAI client with the API key from the .env file
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

# Function to extract text from the PDF
def extract_text_from_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            text += page.get_text("text")
        doc.close()
        return text
    except Exception as e:
        print(f"Error processing PDF for text: {str(e)}")
        return None

# Function to extract images from the PDF
def extract_images_from_pdf(pdf_path):
    try:
        doc = fitz.open(pdf_path)
        images = []
        image_dir = "./uploads/extracted_images"
        os.makedirs(image_dir, exist_ok=True)
        
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            image_list = page.get_images(full=True)
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image = Image.open(io.BytesIO(base_image["image"]))
                image_path = os.path.join(image_dir, f"image_page{page_num+1}_img{img_index+1}.png")
                image.save(image_path)
                images.append(image_path)
        doc.close()
        return images
    except Exception as e:
        print(f"Error extracting images from PDF: {str(e)}")
        return []

# Function to encode the image to base64
def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# Function to explain the image using OpenAI's GPT-4
def explain_image(image_path):
    try:
        base64_image = encode_image(image_path)
        response = client.chat.completions.create(
            model="gpt-4-turbo",  # Correct model name
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "Explain these images?",
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url":  f"data:image/png;base64,{base64_image}"
                            },
                        }
                    ],
                }
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error explaining image: {str(e)}")
        return None

# Main function to handle PDF extraction and image explanation
def main(pdf_path):
    # Step 1: Extract text from PDF
    extracted_text = extract_text_from_pdf(pdf_path)

    # Step 2: Extract images from PDF
    extracted_images = extract_images_from_pdf(pdf_path)

    # Step 3: Explain each image using OpenAI
    for image_path in extracted_images:
        extracted_text += explain_image(image_path)
    
    return extracted_text

if __name__ == "__main__":
    if len(sys.argv) > 1:
        pdf_path = sys.argv[1]
        extracted_text = main(pdf_path)
        
        print(extracted_text)
        sys.stdout.flush()
