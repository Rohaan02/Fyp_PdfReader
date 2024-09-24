<!DOCTYPE html>
<html lang="en">



<body>
    <h1>Extraction of User Defined Information from PDF</h1>
    <h2>Project Overview</h2>
    <p>
        The "Extraction of User Defined Information from PDF" is a comprehensive web-based tool designed to automate the
        process of extracting specific information from PDF documents and images. This project addresses the challenge
        of retrieving targeted data from diverse PDF formats and graphical content, providing a user-friendly platform
        for
        researchers, analysts, and professionals to streamline information retrieval tasks.
    </p>
    <h2>Key Features</h2>
    <ol>
        <li>
            <h3>User Account Management:</h3>
        </li>
        <ul>
            <li>Users can sign up or log in using a form or their Google accounts.</li>
            <li>All user-related data, such as chat history and preferences, are securely stored in the database.</li>
        </ul>
        <li>
            <h3>Custom Information Extraction:</h3>
        </li>
        <ul>
            <li>Users can define specific variables or prompts for information extraction from PDFs, such as names,
                dates,
                keywords, or graphical content.</li>
            <li>Utilizes advanced Natural Language Processing (NLP) and Large Language Models (LLMs) to analyze and
                extract
                the desired information efficiently.</li>
        </ul>
        <li>
            <h3>Meta-Analysis of Extracted Data:</h3>
        </li>
        <ul>
            <li>The tool presents extracted information in multiple formats including text, tables, and graphs to
                enhance
                data analysis.</li>
            <li>Provides comprehensive visualizations and meta-analyses for better insights.</li>
        </ul>
        <li>
            <h3>Storage and Retrieval:</h3>
        </li>
        <ul>
            <li>Offers the capability to store and retrieve previously extracted information for faster responses and
                cost-effective
                processing.</li>
            <li>Personalizes the user experience by saving preferences and extraction history.</li>
        </ul>
        <li>
            <h3>Cross-Platform Accessibility:</h3>
        </li>
        <ul>
            <li>Developed using React for a responsive front-end, ensuring accessibility across various devices and
                browsers.</li>
            <li>Built with Python libraries like PyMuPDF and NLTK for robust back-end processing.</li>
        </ul>
    </ol>
    <h2>Technologies Used</h2>
    <ul>
        <li>
            <h3>Frontend:</h3> React, Tailwind CSS
        </li>
        <li>
            <h3>Backend:</h3> Python, Flask
        </li>
        <li>
            <h3>Libraries:</h3> PyMuPDF for PDF processing, NLTK for text preprocessing, and custom image
            recognition algorithms.
        </li>
        <li>
            <h3>Database:</h3> Firebase or MongoDB for user data and storage of extracted information.
        </li>
        <li>
            <h3>Authentication:</h3> OAuth for Google login, JWT for secure session handling.
        </li>
    </ul>
    <h2>Project Goals and Deliverables</h2>
    <ul>
        <li>
            <h3>Final Deliverable:</h3> A web-based application that provides a seamless and efficient method for
            extracting user-defined information from PDFs.
        </li>
        <li>
            <h3>Beneficiaries:</h3> Researchers, data analysts, students, and professionals across domains like
            healthcare, academia, and finance.
        </li>
    </ul>
    <h2>How to Use</h2>
    <ol>
        <li>
            <h3>Sign Up/Log In:</h3> Users can create an account using the sign-up form or by logging in with their
            Google
            credentials.
        </li>
        <li>
            <h3>Upload PDFs:</h3> Once logged in, users can upload multiple PDF documents or images to the platform.
        </li>
        <li>
            <h3>Define Variables for Extraction:</h3> Specify the variables or prompts that define the information
            to be extracted.
        </li>
        <li>
            <h3>View Results:</h3> Extracted information will be displayed in an easy-to-read format with options
            for meta-analysis and visualization.
        </li>
        <li>
            <h3>Save and Retrieve Data:</h3> Save extraction history and results for future reference.
        </li>
    </ol>
    <h2>Future Enhancements</h2>
    <ul>
        <li>Integration with additional data sources (e.g., databases, cloud storage).</li>
        <li>Implementation of advanced image recognition algorithms to extract graphical content more effectively.</li>
        <li>Enhanced support for multilingual extraction and NLP capabilities.</li>
    </ul>
    <h2>Contact</h2>
    <p>For more information or to contribute to this project, please contact:</p>
    <div style="display: flex; align-items: center;">
        <h4>Rohaan Nadeem:</h4> rohaannadeem2@gmail.com
    </div>
    <div style="display: flex; align-items: center;">
        <h4>Noor Fatima:</h4> noor.fatima3831@gmail.com
    </div>
    <p>We welcome contributions and feedback to help improve the tool!</p>


    <br>
Run Project on Url: http://localhost:5173/
Run Project with "npm run dev"
run backend by run "node index.js" in server directory

    For Extraction of Data from PDF in text form run in server directory
    pip install PyMuPDF 
    To handle file uploads in Express, run in server directory
    npm install express-fileupload

    npm install multer:-
    What is multer?
Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It processes incoming files and makes them accessible in the server through req.files.
In the index.js file provided, multer is used to manage file uploads, saving them to a specific directory (uploads/) on the server.


    <br>
    <br>
</body>

</html>

For the scroll of chat to prevent it from overflow
    npm install react-perfect-scrollbar
