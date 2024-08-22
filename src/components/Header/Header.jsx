import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 w-full shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white text-2xl font-bold">
          <h2 className="pl-2">PDF-Reader</h2>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-white text-lg hover:text-blue-500">
            Home
          </Link>
          <Link to="/auth" className="text-white text-lg hover:text-blue-500">
            Auth Page
          </Link>
          <Link to="/upload" className="text-white text-lg hover:text-blue-500">
            Upload Files
          </Link>
          <Link to="/chat" className="text-white text-lg hover:text-blue-500">
            Chat
          </Link>
        </nav>
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars size={24} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white w-full flex flex-col items-start p-4 space-y-2">
          <Link
            to="/"
            className="text-lg hover:text-blue-500"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/auth"
            className="text-lg hover:text-blue-500"
            onClick={toggleMenu}
          >
            Auth Page
          </Link>
          <Link
            to="/upload"
            className="text-lg hover:text-blue-500"
            onClick={toggleMenu}
          >
            Upload Files
          </Link>
          <Link
            to="/chat"
            className="text-lg hover:text-blue-500"
            onClick={toggleMenu}
          >
            Chat
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
