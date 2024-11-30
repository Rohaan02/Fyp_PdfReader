import React, { useState, useEffect } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatTitles, setChatTitles] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [recentUploadedFilePath, setRecentUploadedFilePath] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUploadedFilePaths = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found");
        toast.error("User not found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/get-file-paths?userId=${user._id}&userType=User`
      );
      const data = await response.json();

      if (data.success && data.filePaths.length > 0) {
        const allFilePaths = data.filePaths.join("\n");
        const extractedText = data.extractedTextFromPDF.join("\n");

        setRecentUploadedFilePath(allFilePaths);

        const existingChat = await fetch(
          `http://localhost:5000/api/chats/${user._id}`
        );
        const chatData = await existingChat.json();

        let existingChatId = null;

        if (chatData.success && chatData.chats.length > 0) {
          const foundChat = chatData.chats.find((chat) =>
            chat.filenames.every((filename) => allFilePaths.includes(filename))
          );

          if (foundChat) {
            existingChatId = foundChat._id;
          }
        }

        if (!existingChatId) {
          createChat(allFilePaths, extractedText);
        } else {
          setChatId(existingChatId);
        }

        const botMessage = {
          user: "AI",
          text: `You have uploaded the following files:\n\n${allFilePaths}\n\nExtracted Text from PDFs:\n\n${extractedText}`,
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
      toast.warn("Error fetching file paths:", error);
      const errorMessage = {
        user: "AI",
        text: "An error occurred while fetching your uploaded files.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const fetchPreviousChats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found");
        toast.error("User not found");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/chats/${user._id}`
      );
      const data = await response.json();

      if (data.success && data.chats.length > 0) {
        const sortedChats = data.chats.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setChatTitles(
          sortedChats.map((chat) => ({
            _id: chat._id,
            chatName: chat.chatName || "Unnamed Chat",
            createdAt: chat.createdAt,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching previous chats:", error);
      toast.error("Error fetching previous chats:");
    }
  };

  const createChat = async (filePaths, extractedText) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found");
        toast.error("User not found");
        return;
      }

      const filenames = filePaths.split("\n");

      const response = await fetch("http://localhost:5000/api/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          filenames,
          extractedText,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setChatId(data.chatId);
      } else {
        console.error("Failed to create chat:", data.message);
        toast.error("Failed to create chat:", data.message);
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      toast.error("Error creating chat:", error);
    }
  };

  const createSubChat = async (question, response, chatId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found");
        toast.error("User not found");
        return;
      }

      const subChatResponse = await fetch(
        "http://localhost:5000/api/create-subchat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            question,
            response,
            userId: user._id,
          }),
        }
      );

      const data = await subChatResponse.json();
      if (data.success) {
        console.log("Subchat created:", data.subChat);
      } else {
        console.error("Failed to create subchat:", data.message);
        toast.error("Failed to create subchat:");
      }
    } catch (error) {
      console.error("Error creating subchat:", error);
      toast.error("Error creating subchat:", error);
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    // Add user's message to chat
    const newMessage = { user: "You", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Start loading state to disable sending during request
    setLoading(true);

    try {
      // Send the user's input and chatId to the backend to get the AI's response
      const response = await fetch("http://localhost:5000/api/call-chatApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input, chatId: chatId }), // Send both user input and chatId
      });

      const data = await response.json();

      if (data.success && data.response) {
        // Add the AI's response to chat
        const aiMessage = { user: "AI", text: data.response };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);

        // Create subchat with the question and AI's response (if a chatId exists)
        if (chatId) {
          createSubChat(input, data.response, chatId);
        }

        // Optionally, you can also handle the extracted text and subchat messages if needed
        // For example, logging them:
        console.log("Extracted Text: ", data.extractedText);
        console.log("SubChat Messages: ", data.subChatMessages);
      } else {
        console.error("Failed to get response from OpenAI:", data.error);
        toast.error("Error fetching AI response.");
      }
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast.error("An error occurred while fetching AI response.");
    } finally {
      // End loading state and clear input field
      setLoading(false);
      setInput("");
    }
  };

  const handleSelectChat = async (chatId) => {
    try {
      setActiveChatId(chatId); // Set the active chat ID

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        console.error("User not found");
        toast.error("User not found");
        return;
      }

      // Fetch chat data
      const response = await fetch(
        `http://localhost:5000/api/chat-data/${chatId}?userId=${user._id}`
      );
      const data = await response.json();

      if (data.success) {
        setChatId(chatId); // Set the current chat ID

        // Combine extracted text and formatted subchat messages
        const extractedTextMessage = {
          user: "AI",
          text: `Extracted Text:\n\n${data.chat.extractedText}`,
        };

        setMessages([extractedTextMessage, ...data.messages]); // Messages now have the correct order
      } else {
        console.error("Failed to fetch chat data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching selected chat:", error);
      toast.error("Error fetching selected chat:", error);
    }
  };

  useEffect(() => {
    fetchUploadedFilePaths();
    fetchPreviousChats();
  }, []);

  return (
    <div className="flex flex-1 bg-gray-100 max-h-[100vh]">
      <ChatSidebar
        chatTitles={chatTitles}
        onSelectChat={handleSelectChat}
        refreshChats={fetchPreviousChats}
        activeChatId={activeChatId}
      />
      <ChatWindow
        messages={messages}
        input={input}
        setInput={setInput}
        chatId={chatId}
        handleSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
};

export default ChatPage;
