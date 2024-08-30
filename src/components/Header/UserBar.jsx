import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userImage1 from "../../assets/images/MenAvators/menAvatorImage.jpg";
import userImage2 from "../../assets/images/MenAvators/menAvatorImage1.png";
import userImage3 from "../../assets/images/MenAvators/menAvatorImage2.png";
import DateTime from "../CurrentTime";

const avatarImages = [userImage1, userImage2, userImage3];

function UserBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    if (user) {
      let savedAvatar = localStorage.getItem("userAvatar");
      if (!savedAvatar) {
        const randomAvatar =
          avatarImages[Math.floor(Math.random() * avatarImages.length)];
        localStorage.setItem("userAvatar", randomAvatar);
        savedAvatar = randomAvatar;
      }
      setUserAvatar(savedAvatar);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userAvatar");
    navigate("/");
  };

  return (
    <div className="relative text-left flex justify-between bg-slate-600">
      <DateTime />
      {/* User Greeting and Avatar */}
      {user ? (
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <span className="text-white">Hello, {user.username}</span>
          <img
            src={userAvatar || "https://via.placeholder.com/150"} // Default avatar if none provided
            alt="User Avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="px-4 py-1 bg-white text-black font-bold m-2"
        >
          Login
        </button>
      )}

      {/* Dropdown Menu */}
      {user && isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 text-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">
              Edit Profile
            </a>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBar;
