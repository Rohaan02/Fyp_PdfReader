# Extraction of User Defined Information from PDF

## Project Overview

The **"Extraction of User Defined Information from PDF"** is a web-based tool designed to automate the extraction of specific information from PDF documents and images. This project addresses the challenge of retrieving targeted data from diverse PDF formats and graphical content. It provides a user-friendly platform for researchers, analysts, and professionals to streamline information retrieval tasks.

---

## Key Features

### 1. User Account Management

- Users can sign up or log in using a form or their Google accounts.
- All user-related data, such as chat history and preferences, are securely stored in the database.

### 2. Custom Information Extraction

- Users can define specific variables or prompts for extracting information from PDFs, such as names, dates, keywords, or graphical content.
- Utilizes advanced Natural Language Processing (NLP) and Large Language Models (LLMs) to efficiently extract the desired information.

### 3. Meta-Analysis of Extracted Data

- The tool presents extracted information in multiple formats, including text, tables, and graphs, for enhanced data analysis.
- Provides comprehensive visualizations and meta-analyses for better insights.

### 4. Storage and Retrieval

- Offers the capability to store and retrieve previously extracted information for faster responses and cost-effective processing.
- Personalizes the user experience by saving preferences and extraction history.

### 5. Cross-Platform Accessibility

- Developed using React for a responsive front-end, ensuring accessibility across various devices and browsers.
- Built with Express and Python libraries like PyMuPDF and NLTK for robust back-end processing.

---

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Express, Python, Flask
- **Libraries**: PyMuPDF for PDF processing, NLTK for text preprocessing, and custom image recognition algorithms.
- **Database**: MongoDB for user data and storage of extracted information.
- **Authentication**: OAuth for Google login, JWT for secure session handling.

---

## Project Goals and Deliverables

### Final Deliverable:

A web-based application that provides a seamless and efficient method for extracting user-defined information from PDFs.

### Beneficiaries:

Researchers, data analysts, students, and professionals across domains like healthcare, academia, and finance.

---

## How to Use

1. **Sign Up/Log In**: Create an account using the sign-up form or log in with Google credentials.
2. **Upload PDFs**: Upload multiple PDF documents to the platform after logging in.
3. **Define Variables for Extraction**: Specify variables or prompts for extracting desired information.
4. **View Results**: Extracted information is displayed in an easy-to-read format, with options for meta-analysis and visualization.
5. **Save and Retrieve Data**: Save extraction history and results for future reference.

---

## Future Enhancements

- Integration with additional data sources (e.g., databases, cloud storage).
- Advanced image recognition algorithms for improved graphical content extraction.
- Enhanced support for multilingual extraction and NLP capabilities.

---

## Run the Project

### 1. **Frontend**:

- Run the project with `npm run dev`.
- Open the project at [http://localhost:5173](http://localhost:5173).

### 2. **Backend**:

- Run the backend by executing `npm start` in the server directory; this will activate nodemon, which restarts the server on every update in the backend code.

### 3. **Python Setup** (if not already installed):

- Install `python3-pip` by running the following command:
  ```bash
  sudo apt install python3-pip
  ```
- After the installation is complete, verify that pip is installed by checking its version:
  ```bash
  pip3 --version
  ```
- Now, install PyMuPDF by running:
  ```bash
  pip3 install PyMuPDF
  ```

### 4. **PDF Data Extraction**:

- Install PyMuPDF for PDF data extraction:
  ```bash
  pip install PyMuPDF
  ```

### 5. **File Uploads**:

- To handle file uploads in Express, run:
  ```bash
  npm install express-fileupload
  ```
- Install Multer for multipart/form-data handling:
  ```bash
  npm install multer
  ```
- Multer is a middleware for handling file uploads. In this project, it saves uploaded files to the `uploads/` directory.

### 6. **Chat Scroll Handling**:

- To prevent chat overflow, install react-perfect-scrollbar:
  ```bash
  npm install react-perfect-scrollbar
  ```

### 7. **Additional Dependencies**:

- For toast notifications:
  ```bash
  npm install --save react-toastify
  ```
- To get environment variables from the server/.env file:
  ```bash
  npm install dotenv
  ```
- For spinner icons:
  ```bash
  npm install react-loader-spinner
  ```
- To display data in a readable format:
  ```bash
  npm install react-markdown
  ```
- For converting database responses back to markdown:
  ```bash
  npm install remark-gfm
  ```
- To install pandas for Python:

  ```bash
  sudo apt install python3-pandas
  ```

---

## Additional Setup for Image Explanation with OpenAI:

Install the necessary dependencies for explaining extracted images using OpenAI:

```bash
sudo apt install python3-openai
sudo apt install python3-dotenv
```

---

## Contact

For more information or to contribute to this project, please contact:

- **Rohaan Nadeem**: [rohaannadeem2@gmail.com](mailto:rohaannadeem2@gmail.com)
- **Noor Fatima**: [noor.fatima3831@gmail.com](mailto:noor.fatima3831@gmail.com)

We welcome contributions and feedback to help improve the tool!

also installed the for the explaination of extracted images with openai
sudo apt install python3-openai
sudo apt install python3-dotenv
