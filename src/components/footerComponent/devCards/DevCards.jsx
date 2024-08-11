// UserCard.js
import React from "react";

const UserCard = ({ name, links }) => {
  return (
    <div>
      <span className="userName">{name}</span>
      <br />
      {links.map(({ url, icon: Icon }, index) => (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-link"
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default UserCard;
