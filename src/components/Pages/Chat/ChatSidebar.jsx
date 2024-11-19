import React from "react";

const ChatSidebar = ({ chatTitles, onSelectChat }) => {
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

  // Group chats by their formatted date
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
        {/* Heading for Previous Chats */}
        <div className="text-lg font-bold text-center bg-gray-800 text-yellow-50 py-1 rounded-lg mb-4">
          Previous Chats
        </div>

        {/* Render grouped chats */}
        {Object.entries(groupedChats).map(([date, chats], index) => (
          <div key={index}>
            {/* Display the date header */}
            <div className="text-gray-600 text-sm font-semibold mb-2 mt-6">
              {date}
            </div>
            {/* Display the buttons for each chat under this date */}
            {chats.map((chat, chatIndex) => (
              <button
                key={chatIndex}
                className="bg-gray-200 p-2 text-left text-xs capitalize rounded h-12 mb-2 block w-[100%]"
                onClick={() => onSelectChat(chat.chatName)}
              >
                {chat.chatName}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
