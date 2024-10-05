import React, { useState, useEffect, useRef } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputWidth, setInputWidth] = useState("100%");
  const [recentUploadedFilePath, setRecentUploadedFilePath] = useState(null);

  // Create a ref for the messages container
  const messagesEndRef = useRef(null);

  const fetchUploadedFilePaths = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored in localStorage
      if (!user) {
        console.error("User not found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/get-file-paths?userId=${user._id}&userType=User`
      );
      const data = await response.json();

      if (data.success && data.filePaths.length > 0) {
        // Show all file paths from the last entry
        const allFilePaths = data.filePaths.join("\n"); // Join the array into a string
        const extractedText = data.extractedTextFromPDF.join("\n"); // Join extracted text into a string

        setRecentUploadedFilePath(allFilePaths); // Update to store all file paths
        console.log(allFilePaths);

        // Construct the bot message
        const botMessage = {
          user: "AI",
          text: `You have uploaded the following files:\n\n${allFilePaths}\n\nExtracted Text from PDFs:\n\n${extractedText}`, // Include extracted text after file paths
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const noFilesMessage = {
          user: "AI",
          text: "No recent file uploads found.",
        };
        setMessages((prevMessages) => [...prevMessages, noFilesMessage]);
      }
    } catch (error) {
      console.error("Error fetching file paths:", error);
      const errorMessage = {
        user: "AI",
        text: "An error occurred while fetching your uploaded files.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  useEffect(() => {
    fetchUploadedFilePaths();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      console.error("Message cannot be empty.");
      return;
    }

    const newMessage = { user: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // If file path is available, extract data from the uploaded file
    if (recentUploadedFilePath) {
      try {
        const response = await fetch("/api/extract-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ filePath: recentUploadedFilePath }),
        });

        const data = await response.json();
        if (data.success) {
          console.log("Extracted data:", data.extractedData);
          const botMessage = { user: "AI", text: data.extractedData };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error("Data extraction failed.");
          const errorMessage = {
            user: "AI",
            text: "Failed to extract data from the file.",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } catch (error) {
        console.error("Error extracting data:", error);
        const errorMessage = {
          user: "AI",
          text: "An error occurred while processing your request.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } else {
      // If no file path is available, just simulate a bot response
      const simulatedResponse = { user: "AI", text: "No file uploaded." };
      setMessages((prevMessages) => [...prevMessages, simulatedResponse]);
    }

    // Clear the input
    setInput("");
    setInputWidth("100%");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      } else {
        setInputWidth((prevWidth) => (prevWidth === "100%" ? "150%" : "100%"));
      }
    }
  };

  // Scroll to the bottom of the messages container when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 bg-gray-100">
      {/* Left side - Chat Titles */}
      <div className="w-1/5 bg-white shadow-lg overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-end">
            <button className="bg-black text-white font-bold p-2 rounded mb-2">
              New Chat
            </button>
          </div>
          <div className="text-gray-900 mb-2 font-bold">Today</div>
          <div className="bg-gray-200 p-2 rounded mb-2">Chat Title</div>
          <div className="bg-gray-200 p-2 rounded mb-2">Chat Title</div>
          <div className="text-gray-900 mb-2 font-bold">Yesterday</div>
          <div className="bg-gray-200 p-2 rounded mb-2">Chat Title</div>
          <div className="bg-gray-200 p-2 rounded">Chat Title</div>
        </div>
      </div>

      {/* Right side - Chat Window */}
      <div className="w-4/5 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Messages area */}
        <div
          className="flex-grow p-6 overflow-y-auto"
          style={{ height: "50vh" }} // Set a fixed height
        >
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.user === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-lg p-4 rounded-lg ${
                    msg.user === "You"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {/* Add a div to act as the bottom of the messages area */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Send a message..."
            style={{ width: inputWidth }}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
