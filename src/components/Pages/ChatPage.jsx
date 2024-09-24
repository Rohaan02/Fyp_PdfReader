import React, { useState, useEffect, useRef } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputWidth, setInputWidth] = useState("100%");

  // Create a ref for the messages container
  const messagesEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { user: "You", text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input }),
        });

        const data = await response.json();
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: "AI", text: data.answer },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      }

      setInput("");
      setInputWidth("100%");
    }
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
          style={{ height: "50px" }} // Set a fixed height
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
