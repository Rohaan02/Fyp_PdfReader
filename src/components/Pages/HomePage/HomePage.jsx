import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import projectFlowDiagram from "../../../assets/images/FYPExtractionofUserDefinedInformationfromPDF.jpeg";

const HomePage = () => {
  const listRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-right");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    listRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Cleanup on component unmount
    return () => {
      listRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">PDF Data Extraction Tool</h1>
        <p className="mt-2">
          Automating the extraction of specific information from PDF documents
        </p>
      </header>

      <main className="p-6">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-4xl text-center font-extrabold mb-14 heading-slide-right">
            Project Flow
          </h2>

          {/* Centered Image with Animation */}
          <img
            src={projectFlowDiagram}
            alt="Project Flow Diagram"
            className="w-2/3 h-auto rounded-lg mx-auto block image-slide-in"
          />

          {/* Steps Overview */}
          <div className="mt-24">
            <h3 className="text-2xl font-bold mb-4 text-white py-3 bg-blue-600 rounded-lg shadow-md text-center heading-slide-right">
              Step-by-Step Process
            </h3>
            <ol className="list-decimal list-inside space-y-4">
              {[
                "Upload PDF files to extract data.",
                "View the uploaded PDFs as cards with an option to remove.",
                "Click 'Continue' to initiate data extraction using the PyMuPDF library.",
                "Once data extraction is complete, redirect to the chat page.",
                "Ask questions related to the extracted data and view responses.",
              ].map((text, index) => (
                <li
                  key={index}
                  className="opacity-0 text-lg p-2 pl-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-300 transition duration-300 ease-in-out"
                  ref={(el) => (listRef.current[index] = el)}
                >
                  {text}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
