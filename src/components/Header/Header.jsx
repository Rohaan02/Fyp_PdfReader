import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaHome, FaUpload, FaComments, FaTachometerAlt, FaUserCircle, FaSignInAlt } from "react-icons/fa"; // Icons for the navbar
import UserBar from "./UserBar";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
      <div>
        <header className="bg-gray-900 py-4 w-full shadow-lg">
          <div className="container mx-auto flex justify-between items-center p-4">
            {/* Align the heading to the left */}
            <div className="text-white text-2xl font-bold flex-1">
              <h2 className="pl-2">Extraction of User Defined Information from PDF</h2>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-white text-xl flex items-center hover:text-blue-500">
                <FaHome size={24} className="mr-2" />
                Home
              </Link>
              <Link to="/auth" className="text-white text-xl flex items-center hover:text-blue-500">
                <FaSignInAlt size={24} className="mr-2" />
                Auth Page
              </Link>
              <Link to="/upload" className="text-white text-xl flex items-center hover:text-blue-500">
                <FaUpload size={24} className="mr-2" />
                Upload Files
              </Link>
              <Link to="/chat" className="text-white text-xl flex items-center hover:text-blue-500">
                <FaComments size={24} className="mr-2" />
                Chat
              </Link>
              <Link to="/dashboard" className="text-white text-xl flex items-center hover:text-blue-500">
                <FaTachometerAlt size={24} className="mr-2" />
                Dashboard
              </Link>

              {/* Profile Link with Icon */}
              <Link to="/profile" className="text-white text-xl flex items-center hover:text-blue-500">
                <FaUserCircle size={24} className="mr-2" />
                Profile
              </Link>
            </nav>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button className="text-white focus:outline-none" onClick={toggleMenu}>
                <FaBars size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
              <div className="md:hidden bg-gray-800 text-white w-full flex flex-col items-start p-4 space-y-2">
                <Link to="/" className="text-xl flex items-center hover:text-blue-500" onClick={toggleMenu}>
                  <FaHome className="mr-2" />
                  Home
                </Link>
                <Link to="/auth" className="text-xl flex items-center hover:text-blue-500" onClick={toggleMenu}>
                  <FaSignInAlt className="mr-2" />
                  Auth Page
                </Link>
                <Link to="/upload" className="text-xl flex items-center hover:text-blue-500" onClick={toggleMenu}>
                  <FaUpload className="mr-2" />
                  Upload Files
                </Link>
                <Link to="/chat" className="text-xl flex items-center hover:text-blue-500" onClick={toggleMenu}>
                  <FaComments className="mr-2" />
                  Chat
                </Link>
                <Link to="/dashboard" className="text-xl flex items-center hover:text-blue-500" onClick={toggleMenu}>
                  <FaTachometerAlt className="mr-2" />
                  Dashboard
                </Link>

                {/* Profile Link for Mobile Menu */}
                <Link to="/profile" className="text-xl flex items-center hover:text-blue-500" onClick={toggleMenu}>
                  <FaUserCircle className="mr-2" />
                  Profile
                </Link>
              </div>
          )}
        </header>

        {/* Optional UserBar below header */}
        <UserBar />
      </div>
  );
}

export default Header;
