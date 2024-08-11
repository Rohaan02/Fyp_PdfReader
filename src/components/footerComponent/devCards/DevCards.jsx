// UserCard.js
import React from 'react';

const UserCard = ({ name, icons }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>
        {icons.map((icon, index) => (
          <img key={index} src={icon} alt={`${name} icon ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default UserCard;
