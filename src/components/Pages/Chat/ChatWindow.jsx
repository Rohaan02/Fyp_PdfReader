import React, { useEffect, useRef } from "react";
import { Oval } from "react-loader-spinner"; // Import the spinner

const ChatWindow = ({
  messages,
  input,
  setInput,
  chatId,
  handleSendMessage,
  loading,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages when a new message is added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // If Enter is pressed and Shift is not pressed, send the message
      e.preventDefault(); // Prevent line break
      handleSendMessage();
    }
  };

  return (
    <div className="w-4/5 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
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

          {/* Show loading spinner as a new message for AI response */}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-lg p-4 rounded-lg bg-gray-200 text-gray-900">
                <div className="flex items-center mt-2">
                  <Oval
                    height="20"
                    width="20"
                    color="#00BFFF"
                    ariaLabel="loading"
                    strokeWidth={5}
                    strokeWidthSecondary={2}
                  />
                  <span className="ml-2">Generating response...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-gray-300 p-4">
        <textarea
          className="w-full h-24 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 resize-none"
          value={input}
          placeholder="Type your message..."
          disabled={loading} // Disable the input field when loading is true
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Add the keydown handler
        />
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? (
            <div className="flex">
              <Oval
                height="20"
                width="20"
                color="#fff"
                ariaLabel="loading"
                strokeWidth={5}
                strokeWidthSecondary={2}
              />
              Sending...
            </div>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
