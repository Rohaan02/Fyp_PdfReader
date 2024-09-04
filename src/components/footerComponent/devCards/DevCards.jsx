import React from "react";

const UserCard = ({ name, links }) => {
  return (
    <div className="flex items-center mb-2">
      <span className="userName w-36">{name}</span>
      <div className="flex space-x-4">
        {links.map(({ url, icon: Icon }, index) => (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-link text-white hover:text-blue-500"
          >
            <Icon size={20} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default UserCard;
