import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa'; // Import sign-out icon
import Sidebar from './Sidebar'; // Assuming you created a Sidebar component

const Dashboard = () => {
    const handleSignOut = () => {
        // Perform sign-out logic, e.g., clearing user data or token
        console.log("User signed out");
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <Sidebar handleSignOut={handleSignOut} />

            {/* Main Content */}
            <div className="flex-grow p-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Hi, John Doe</h1>
                        <p className="text-gray-600">Let's get started today!</p>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2">
                        {/* Main Article */}
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                            <h2 className="text-2xl font-bold mb-4">Lorem ipsum</h2>
                            <p className="text-gray-600">
                                Lorem ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem ipsum has been the industry's standard dummy text ever since the
                                1500s, when an unknown printer took a galley of type and scrambled it to
                                make a type specimen book.
                            </p>
                        </div>

                        {/* Small Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="font-bold mb-2">Lorem ipsum</h2>
                                <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing industry.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="font-bold mb-2">Lorem ipsum</h2>
                                <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing industry.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="font-bold mb-2">Lorem ipsum</h2>
                                <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing industry.</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-lg">
                                <h2 className="font-bold mb-2">Lorem ipsum</h2>
                                <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing industry.</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <img
                            src="path-to-your-profile-image" // Replace with the correct image path
                            alt="John Doe"
                            className="rounded-full w-32 h-32 mx-auto mb-4"
                        />
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <p className="text-gray-600">Software Engineer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
