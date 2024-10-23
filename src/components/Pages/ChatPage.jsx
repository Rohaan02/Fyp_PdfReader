import React, { useState, useEffect, useRef } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputWidth, setInputWidth] = useState("100%");
  const [recentUploadedFilePath, setRecentUploadedFilePath] = useState(null);
  const [chatTitles, setChatTitles] = useState([]);
  const [chatId, setChatId] = useState(null); // Track the chat ID

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

        // Construct the bot message
        const botMessage = {
          user: "AI",
          text: `You have uploaded the following files:\n\n${allFilePaths}\n\nExtracted Text from PDFs:\n\n${extractedText}`,
        };

        // Add the bot message
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        // Create a new chat in the database
        createChat(allFilePaths, extractedText);
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

  const fetchPreviousChats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored in localStorage
      if (!user) {
        console.error("User not found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/get-previous-chats?userId=${user._id}`
      );
      const data = await response.json();

      if (data.success && data.chats.length > 0) {
        // Set chat titles from previous chats
        setChatTitles(data.chats.map(chat => chat.title));
      }
    } catch (error) {
      console.error("Error fetching previous chats:", error);
    }
  };

  const createChat = async (filePaths, extractedText) => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
      if (!user) {
        console.error("User not found");
        return;
      }

      const filenames = filePaths.split("\n"); // Convert string back to array

      const response = await fetch("http://localhost:5000/api/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id, // Pass the user ID
          filenames,
          extractedText,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Chat created:", data.chatId);
        setChatId(data.chatId); // Save chat ID
      } else {
        console.error("Failed to create chat:", data.message);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  const createSubChat = async (question, response, chatId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found");
        return;
      }

      const subChatResponse = await fetch("http://localhost:5000/api/create-subchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId,
          question,
          response,
          userId: user._id, // Include the userId
        }),
      });

      const data = await subChatResponse.json();
      if (data.success) {
        console.log("Subchat created:", data.subChat);
      } else {
        console.error("Failed to create subchat:", data.message);
      }
    } catch (error) {
      console.error("Error creating subchat:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFilePaths();
    fetchPreviousChats();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === "") {
      console.error("Message cannot be empty.");
      return;
    }

    const newMessage = { user: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // After the user's message, respond with "response from AI"
    const botResponse = { user: "AI", text: "response from ai" };
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    // Save sub-chat with user question and AI response
    if (chatId) {
      createSubChat(input, "response from ai", null, chatId);
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
          {chatTitles.map((title, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded mb-2">
              {title}
            </div>
          ))}
          <div className="text-gray-900 mb-2 font-bold">Yesterday</div>
          {/* Placeholder titles */}
          <div className="bg-gray-200 p-2 rounded mb-2">Chat Title</div>
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
                className={`flex ${msg.user === "You" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-lg p-4 rounded-lg ${msg.user === "You"
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
        <div className="bg-gray-300 p-4">
          <textarea
            className="w-full h-20 p-2 rounded-lg resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ width: inputWidth }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white font-bold p-2 rounded-lg mt-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
