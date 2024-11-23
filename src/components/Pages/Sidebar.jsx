import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaHome, FaUser, FaFilePdf, FaComments, FaLock } from 'react-icons/fa';

const Sidebar = () => {
    const [showSignOutConfirmation, setShowSignOutConfirmation] = useState(false);

    const handleSignOut = () => {
        console.log('User signed out');
        setShowSignOutConfirmation(false);
    };

    return (
        <div className="w-1/5 bg-gray-900 shadow-md min-h-screen flex flex-col justify-between text-white">
            <div>
                <div className="p-6 text-2xl font-bold text-white">Dashboard</div>
                <nav className="mt-8 space-y-4">
                    <ul className="ml-4 space-y-4">
                        <li>
                            <Link to="/dashboard" className="flex items-center text-gray-400 hover:text-white">
                                <FaHome className="mr-3" />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/auth" className="flex items-center text-gray-400 hover:text-white">
                                <FaLock className="mr-3" />
                                Auth Page
                            </Link>
                        </li>
                        <li>
                            <Link to="/upload" className="flex items-center text-gray-400 hover:text-white">
                                <FaFilePdf className="mr-3" />
                                PDF Files
                            </Link>
                        </li>
                        <li>
                            <Link to="/chat" className="flex items-center text-gray-400 hover:text-white">
                                <FaComments className="mr-3" />
                                Chat
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="flex items-center text-gray-400 hover:text-white">
                                <FaUser className="mr-3" />
                                Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Sign Out Button */}
            <div className="p-6">
                <button
                    onClick={() => setShowSignOutConfirmation(true)} // Open the confirmation modal
                    className="flex items-center w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                >
                    <FaSignOutAlt className="mr-3" />
                    Sign Out
                </button>
            </div>

            {/* Sign-Out Confirmation Modal */}
            {showSignOutConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4 text-black">Confirmation</h2> {/* Changed text color */}
                        <p className="mb-6 text-black">Are you sure you want to sign out?</p> {/* Changed text color */}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowSignOutConfirmation(false)} // Cancel action
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSignOut} // Confirm and sign out
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
