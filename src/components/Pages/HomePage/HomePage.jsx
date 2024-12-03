import React, { useEffect, useRef } from "react";
import "./HomePage.css";
import projectFlowDiagram from "../../../assets/images/FYPExtractionofUserDefinedInformationfromPDF.jpeg";
import { FaLinkedin, FaGithub, FaFemale, FaUserAlt } from "react-icons/fa";

const HomePage = () => {
  const listRef = useRef([]);
  const teamRef = useRef([]);

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
        threshold: 0.1,
      }
    );

    listRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Observing team members
    teamRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      listRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });

      teamRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const users = [
    {
      name: "Rohaan Nadeem",
      role: "Software Engineer",
      links: [
        { url: "https://www.linkedin.com/in/rohaan", icon: FaLinkedin },
        { url: "https://github.com/Rohaan02", icon: FaGithub },
      ],
    },
    {
      name: "Noor Fatima",
      role: "Software Engineer",
      links: [
        {
          url: "https://www.linkedin.com/in/noor-fatima-2571a222a/",
          icon: FaLinkedin,
        },
        { url: "https://github.com/NoorFatima02", icon: FaGithub },
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex">
      <main className="flex-1 overflow-y-auto mr-6">
        {/* Left Section */}
        <div className="md:col-span-2">
          {/* Header */}
          <header className="bg-blue-500 p-4 text-white text-center mb-6">
            <h1 className="text-3xl font-bold">
              Extraction of User Defined Information from PDF
            </h1>
            <p className="mt-2">
              Automating the extraction of specific information from PDF
              documents
            </p>
          </header>

          {/* Project Flow Diagram */}
          <div className="mb-6">
            <img
              src={projectFlowDiagram}
              alt="Project Flow Diagram"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* About the Project */}
          <section className="bg-white p-6 mt-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center bg-blue-600 text-white py-3 rounded-md">
              About the Project
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              The{" "}
              <strong>"Extraction of User Defined Information from PDF"</strong>{" "}
              system is designed to streamline the extraction of specific
              information from PDF documents using advanced NLP techniques.
              Built on the robust MERN stack, the platform allows users to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>
                <strong>Register or Login with Google</strong> to create and
                manage their account.
              </li>
              <li>
                <strong>Upload multiple PDF files</strong>, with secure storage
                and retrieval.
              </li>
              <li>
                <strong>Ask intelligent questions</strong> about the uploaded
                documents using an LLM-based model for accurate and insightful
                responses.
              </li>
              <li>
                <strong>Generate Meta Analysis</strong>, providing deeper
                insights when users approve.
              </li>
            </ul>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              Users can track and manage their interactions through intuitive
              chat-based interfaces, ensuring a seamless experience for
              navigating and analyzing document data. This innovative tool
              combines AI and user-friendly design to make PDF data extraction
              effortless!
            </p>
          </section>

          {/* Step-by-Step Process */}
          <section className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h3 className="text-2xl font-bold mb-4 text-center bg-blue-600 text-white py-3 rounded-md">
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
          </section>
        </div>
      </main>

      {/* Right Sidebar (Sticky) */}
      <div className="w-1/4 sticky top-6 max-h-screen overflow-y-auto">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4 text-center bg-blue-600 text-white py-3 rounded-md">
            Meet the Team
          </h3>
          <div className="space-y-4">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                ref={(el) => (teamRef.current[index] = el)}
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center">
                  {/* Conditionally Render FaFemale for Noor */}
                  {user.name === "Noor Fatima" ? (
                    <FaFemale className="text-pink-500 text-4xl" />
                  ) : (
                    <FaUserAlt className="text-gray-400 text-4xl" />
                  )}
                </div>
                <h4 className="text-lg font-semibold">{user.name}</h4>
                <p className="text-gray-600">{user.role}</p>
                <div className="flex mt-4 space-x-3">
                  {user.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <link.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
