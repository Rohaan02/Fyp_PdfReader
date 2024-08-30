import React, { useState, useEffect } from "react";

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputWidth, setInputWidth] = useState("100%");

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = { user: "You", text: input };
      setMessages([...messages, newMessage]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      setMessages([...messages, newMessage, { user: "AI", text: data.answer }]);
      setInput("");
      setInputWidth("100%"); // Reset the input width after sending the message
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line from being added
      handleSendMessage();
    } else if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault(); // Prevents a new line from being added
      setInputWidth((prevWidth) => (prevWidth === "100%" ? "150%" : "100%"));
    }
  };

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
        <div className="flex-grow p-6 overflow-y-auto space-y-4">
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
