import React, { useState } from "react";
import { FaUser, FaLock, FaUpload, FaSave, FaSync } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Adjust the import path if necessary

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("general");
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("johndoe@gmail.com");
    const [gender, setGender] = useState("Male");
    const [profileImage, setProfileImage] = useState(null);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const handleReset = () => {
        // Reset to default values
        setFirstName("John");
        setLastName("Doe");
        setEmail("johndoe@gmail.com");
        setGender("Male");
        setProfileImage(null);
    };

    const handleSave = () => {
        // Validation for empty fields
        if (!firstName || !lastName || !email || !gender) {
            alert("Please fill in all the fields.");
            return;
        }

        // Save logic here
        alert("Profile information saved successfully!");
        console.log("Profile saved:", { firstName, lastName, email, gender, profileImage });
    };

    const handlePasswordSave = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        if (!oldPassword || !newPassword || !confirmPassword) {
            alert("Please fill in all the password fields.");
            return;
        }

        // Save password logic here
        alert("Password changed successfully!");
        console.log("Password Changed:", { oldPassword, newPassword });

        // Reset password fields
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-grow p-8">
                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-6">Profile</h1>
                    <p className="text-gray-600 mb-6">Lorem ipsum dolor is simply dummy text.</p>

                    <div className="flex items-start">
                        {/* Sidebar for General and Change Password */}
                        <div className="w-1/4">
                            <button
                                onClick={() => setActiveTab("general")}
                                className={`flex items-center mb-4 p-2 rounded-lg ${activeTab === "general" ? "bg-blue-100 text-blue-500 font-bold" : "text-gray-500 hover:text-blue-500"}`}
                            >
                                <FaUser className="mr-2" /> General
                            </button>
                            <button
                                onClick={() => setActiveTab("password")}
                                className={`flex items-center p-2 rounded-lg ${activeTab === "password" ? "bg-blue-100 text-blue-500 font-bold" : "text-gray-500 hover:text-blue-500"}`}
                            >
                                <FaLock className="mr-2" /> Change Password
                            </button>
                        </div>

                        {/* Content depending on the active tab */}
                        <div className="w-3/4">
                            {activeTab === "general" && (
                                <>
                                    <div className="flex items-center justify-start mb-8">
                                        {/* Profile Image Upload */}
                                        <div className="relative">
                                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                                                {profileImage ? (
                                                    <img src={profileImage} alt="Profile" className="rounded-full w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-gray-500">150 x 150</span>
                                                )}
                                            </div>
                                            <label
                                                htmlFor="upload"
                                                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
                                            >
                                                <FaUpload />
                                            </label>
                                            <input
                                                id="upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </div>

                                        {/* Profile Form */}
                                        <div className="ml-8 w-full">
                                            <div className="mb-4">
                                                <label className="block font-bold mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="border border-gray-300 p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-bold mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="border border-gray-300 p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-bold mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="border border-gray-300 p-2 rounded w-full"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block font-bold mb-2">Gender</label>
                                                <select
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="border border-gray-300 p-2 rounded w-full"
                                                >
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                </select>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={handleReset}
                                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                                                >
                                                    <FaSync className="inline mr-2" />
                                                    Reset
                                                </button>
                                                <button
                                                    onClick={handleSave}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                >
                                                    <FaSave className="inline mr-2" />
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm">Allowed JPG, GIF, or PNG. Max size of 800KB</p>
                                </>
                            )}

                            {activeTab === "password" && (
                                <>
                                    <div className="mb-4">
                                        <label className="block font-bold mb-2">Old Password</label>
                                        <input
                                            type="password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            className="border border-gray-300 p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-bold mb-2">New Password</label>
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="border border-gray-300 p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-bold mb-2">Confirm Password</label>
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="border border-gray-300 p-2 rounded w-full"
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => {
                                                setOldPassword("");
                                                setNewPassword("");
                                                setConfirmPassword("");
                                            }}
                                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                                        >
                                            <FaSync className="inline mr-2" />
                                            Reset
                                        </button>
                                        <button
                                            onClick={handlePasswordSave}
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            <FaSave className="inline mr-2" />
                                            Save
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
