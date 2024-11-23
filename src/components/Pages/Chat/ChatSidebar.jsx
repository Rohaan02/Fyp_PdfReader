import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ChatSidebar = ({
  chatTitles,
  onSelectChat,
  refreshChats,
  activeChatId,
}) => {
  const formatChatDate = (dateString) => {
    const chatDate = new Date(dateString);
    const now = new Date();

    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const yesterdayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1
    );

    if (chatDate >= todayStart) {
      return "Today's Chat";
    } else if (chatDate >= yesterdayStart && chatDate < todayStart) {
      return "Yesterday's Chat";
    } else {
      return `${chatDate.getDate().toString().padStart(2, "0")}/${(
        chatDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${chatDate.getFullYear()}`;
    }
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleEdit = async (chatId) => {
    const newChatName = prompt("Enter new chat name:");
    if (!newChatName) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatName: newChatName, userId: user._id }),
      });
      alert("Chat updated successfully");
      refreshChats();
    } catch (error) {
      console.error("Error updating chat:", error);
      alert("Failed to update chat");
    }
  };

  const handleDelete = async (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await fetch(`http://localhost:5000/api/chats/${chatId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      });
      alert("Chat deleted successfully");
      refreshChats();
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Failed to delete chat");
    }
  };

  const groupedChats = chatTitles.reduce((acc, chat) => {
    const formattedDate = formatChatDate(chat.createdAt);
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(chat);
    return acc;
  }, {});

  return (
    <div className="w-1/5 bg-white shadow-lg overflow-y-auto">
      <div className="p-4">
        <div className="text-lg font-bold text-center bg-gray-800 text-yellow-50 py-1 rounded-lg mb-4">
          Previous Chats
        </div>
        {Object.entries(groupedChats).map(([date, chats], index) => (
          <div key={index}>
            <div className="text-gray-600 text-sm font-semibold mb-2 mt-6">
              {date}
            </div>
            {chats.map((chat, chatIndex) => (
              <button
                key={chatIndex}
                // className="flex justify-between items-center mt-2 bg-gray-200 p-2 text-left text-xs capitalize rounded h-12 w-full hover:bg-gray-300"
                className={`flex justify-between items-center mt-2 p-2 text-left text-xs capitalize rounded h-12 w-full ${
                  chat._id === activeChatId
                    ? "bg-blue-200" // Highlight for active chat
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                // onClick={() => onSelectChat(chat.chatName)}
                onClick={() => onSelectChat(chat._id)}
              >
                <span>{truncateText(chat.chatName, 25)}</span>
                <div className="flex space-x-2">
                  <button
                    className="text-gray-400 hover:text-blue-600"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the chat selection
                      handleEdit(chat._id);
                    }}
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the chat selection
                      handleDelete(chat._id);
                    }}
                    title="Delete"
                  >
                    <FaTrashAlt size={16} />
                  </button>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
