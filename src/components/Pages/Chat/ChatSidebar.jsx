import React from "react";

const ChatSidebar = ({ chatTitles, onSelectChat }) => {
  return (
    <div className="w-1/5 bg-white shadow-lg overflow-y-auto">
      <div className="p-4">
        <div className="text-gray-900 mb-2 font-bold">Today</div>
        {chatTitles.map((title, index) => (
          <button
            key={index}
            className="bg-gray-200 p-2 rounded h-12 mb-2 block w-[100%]"
            onClick={() => onSelectChat(title)} // Handle chat selection
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
