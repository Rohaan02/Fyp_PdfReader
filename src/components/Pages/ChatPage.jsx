import React, { useState } from 'react';
import {
  FaPaperPlane,
  FaRegCopy,
  FaThumbsUp,
  FaThumbsDown,
  FaEdit,
} from 'react-icons/fa'; // Import necessary icons
import Sidebar from './Sidebar';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [editingPromptIndex, setEditingPromptIndex] = useState(null); // Index of the message being edited
  const [isEditing, setIsEditing] = useState(false); // Is the user currently editing a message

  // Handle sending or updating a message
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      if (isEditing) {
        // If editing, update the existing message
        const updatedMessages = [...messages];
        updatedMessages[editingPromptIndex].text = inputMessage;
        setMessages(updatedMessages);
        setIsEditing(false); // Exit edit mode
        setEditingPromptIndex(null);
      } else {
        // Add user message to chat
        setMessages([...messages, { sender: 'user', text: inputMessage }]);
        setInputMessage(''); // Clear input after sending

        // Simulate bot response (you can replace this with actual API call)
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: "Here's a response to your message!" },
          ]);
        }, 1000);
      }
    }
  };

  // Handle pressing Enter to send or update
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage(); // Send or update message on pressing Enter
    }
  };

  // Start editing a message (same as ChatGPT)
  const handleEditPrompt = (index) => {
    setEditingPromptIndex(index); // Store the index of the message being edited
    setInputMessage(messages[index].text); // Set the input field to the existing message text
    setIsEditing(true); // Enter edit mode
  };

  // Cancel editing the message
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingPromptIndex(null);
    setInputMessage(''); // Clear the input field
  };

  // Copy the bot's response
  const handleCopyResponse = (text) => {
    navigator.clipboard.writeText(text);
    alert('Response copied to clipboard!');
  };

  return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Chat Area */}
        <div className="flex-grow flex flex-col p-6 bg-white">
          {/* New Chat Button */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Chat</h1>
            <button
                onClick={() => setMessages([{ sender: 'bot', text: 'Hello! How can I assist you today?' }])}
                className="flex items-center bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
            >
              New Chat
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-4 border rounded-lg bg-gray-50 shadow-md mb-4">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-lg p-3 rounded-lg bg-white shadow relative flex">
                    {/* Edit Icon on the Left */}
                    {message.sender === 'user' && (
                        <button
                            className="flex items-center text-gray-500 hover:text-yellow-500 mr-2"
                            onClick={() => handleEditPrompt(index)}
                        >
                          <FaEdit /> {/* Edit Prompt */}
                        </button>
                    )}

                    {/* Conditionally render either the message or input field */}
                    {isEditing && editingPromptIndex === index ? (
                        <div className="flex flex-col w-full">
                    <textarea
                        className="w-full p-3 border rounded-lg"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                    />
                          <div className="flex justify-end mt-2 space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={handleCancelEdit}
                            >
                              Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleSendMessage}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                    ) : (
                        <div className="w-full">
                          <div
                              className={`${
                                  message.sender === 'user'
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-gray-200 text-black'
                              } p-3 rounded-lg`}
                          >
                            {message.text}
                          </div>

                          {/* Action Buttons for Bot Responses */}
                          {message.sender === 'bot' && (
                              <div className="flex space-x-3 mt-2 text-gray-500">
                                <button
                                    className="flex items-center hover:text-green-500"
                                    onClick={() => handleCopyResponse(message.text)}
                                >
                                  <FaRegCopy /> {/* Copy */}
                                </button>
                                <button className="flex items-center hover:text-green-500">
                                  <FaThumbsUp /> {/* Good Response */}
                                </button>
                                <button className="flex items-center hover:text-red-500">
                                  <FaThumbsDown /> {/* Bad Response */}
                                </button>
                              </div>
                          )}
                        </div>
                    )}
                  </div>
                </div>
            ))}
          </div>

          {/* Input Field and Send/Update Button */}
          <div className="flex items-center border-t pt-4">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4"
            />
            <button
                onClick={handleSendMessage}
                className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
            >
              <FaPaperPlane className="mr-2" />
              {isEditing ? 'Update' : 'Send'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default ChatPage;
