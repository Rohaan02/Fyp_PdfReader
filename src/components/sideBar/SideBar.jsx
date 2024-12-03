import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaUserAlt,
  FaComments,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import Logo from "../../assets/Extraction Of User Defined Data From PDF.png";
import ActiveUser from "../../assets/ActiveUser.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header({ isSidebarMinimized, setIsSidebarMinimized }) {
  const location = useLocation(); // To track current route
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("googleUser");
    localStorage.removeItem("userAvatar");
    toast.success("You have been logged out successfully!");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const googleUser = JSON.parse(localStorage.getItem("googleUser"));

  // Determine which avatar to use
  let userAvatar = ActiveUser; // Default avatar
  if (googleUser && googleUser.avatar) {
    userAvatar = googleUser.avatar;
  } else if (user && user.avatar) {
    userAvatar = user.avatar;
  }

  return (
    <aside
      className={`bg-gray-900 text-white h-full fixed z-[0] ${
        isSidebarMinimized ? "w-16" : "w-64"
      } flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-center p-4 relative">
          <div className={`w-44 h-40 ${isSidebarMinimized ? "hidden" : ""}`}>
            <img src={Logo} alt="Logo" />
          </div>
          <button
            onClick={toggleSidebar}
            className="text-white absolute top-4 right-4 cursor-pointer"
            title={isSidebarMinimized ? "Maximize Sidebar" : "Minimize Sidebar"}
          >
            <FaBars size={24} />
          </button>
        </div>
        <div className="p-4 pt-14">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className={`text-lg flex items-center space-x-2 ${
                isActive("/")
                  ? "bg-blue-500 p-2 rounded"
                  : "hover:text-blue-500"
              } ${isSidebarMinimized ? "justify-center" : ""}`}
              title="Dashboard"
            >
              <FaHome />
              {!isSidebarMinimized && <span>Dashboard</span>}
            </Link>
            <Link
              to="/auth"
              className={`text-lg flex items-center space-x-2 ${
                isActive("/auth")
                  ? "bg-blue-500 p-2 rounded"
                  : "hover:text-blue-500"
              } ${isSidebarMinimized ? "justify-center" : ""}`}
              title="Auth Page"
            >
              <FaUserAlt />
              {!isSidebarMinimized && <span>Auth Page</span>}
            </Link>
            <Link
              to="/upload"
              className={`text-lg flex items-center space-x-2 ${
                isActive("/upload")
                  ? "bg-blue-500 p-2 rounded"
                  : "hover:text-blue-500"
              } ${isSidebarMinimized ? "justify-center" : ""}`}
              title="Upload Files"
            >
              <FaUpload />
              {!isSidebarMinimized && <span>Upload Files</span>}
            </Link>
            <Link
              to="/chat"
              className={`text-lg flex items-center space-x-2 ${
                isActive("/chat")
                  ? "bg-blue-500 p-2 rounded"
                  : "hover:text-blue-500"
              } ${isSidebarMinimized ? "justify-center" : ""}`}
              title="Chat"
            >
              <FaComments />
              {!isSidebarMinimized && <span>Chat</span>}
            </Link>
          </nav>
        </div>
      </div>
      {(user || googleUser) && (
        <div className="p-4">
          {/* Active User Info */}
          <Link
            to="/profile"
            className={`flex items-center space-x-4 mb-4 ${
              isSidebarMinimized ? "justify-center" : ""
            }`}
            title="Go to Profile"
          >
            <img
              src={userAvatar}
              alt="Active User"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            {!isSidebarMinimized && (
              <div>
                <p className="text-sm font-bold cursor-pointer">
                  {googleUser?.name || user?.name}
                </p>
                <p className="text-xs cursor-pointer">
                  {googleUser?.email || user?.email}
                </p>
              </div>
            )}
          </Link>

          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className={`text-lg flex items-center space-x-2 hover:text-blue-500 ${
              isSidebarMinimized ? "justify-center" : ""
            }`}
            title="Log Out"
          >
            <FaSignOutAlt size={24} />
            {!isSidebarMinimized && <span>Log Out</span>}
          </button>
        </div>
      )}
    </aside>
  );
}

export default Header;
