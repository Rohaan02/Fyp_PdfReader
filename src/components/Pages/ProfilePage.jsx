import React, { useState, useEffect } from "react";
import { FaUser, FaLock, FaUpload, FaSave, FaSync } from "react-icons/fa";

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

  // Cleanup URL.createObjectURL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setFirstName("John");
    setLastName("Doe");
    setEmail("johndoe@gmail.com");
    setGender("Male");
    setProfileImage(null);
  };

  const handleSave = () => {
    if (!firstName || !lastName || !email || !gender) {
      alert("Please fill in all the fields.");
      return;
    }

    alert("Profile information saved successfully!");
    console.log("Profile saved:", {
      firstName,
      lastName,
      email,
      gender,
      profileImage,
    });
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

    alert("Password changed successfully!");
    console.log("Password Changed:", { oldPassword, newPassword });

    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-grow p-8">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor is simply dummy text.
          </p>

          <div className="flex items-start">
            <div className="w-1/4">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center mb-4 p-2 rounded-lg ${
                  activeTab === "general"
                    ? "bg-blue-100 text-blue-500 font-bold"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                <FaUser className="mr-2" /> General
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex items-center p-2 rounded-lg ${
                  activeTab === "password"
                    ? "bg-blue-100 text-blue-500 font-bold"
                    : "text-gray-500 hover:text-blue-500"
                }`}
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
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="rounded-full w-full h-full object-cover"
                          />
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
                        <label
                          htmlFor="firstName"
                          className="block font-bold mb-2"
                        >
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="lastName"
                          className="block font-bold mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="email" className="block font-bold mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border border-gray-300 p-2 rounded w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="gender"
                          className="block font-bold mb-2"
                        >
                          Gender
                        </label>
                        <select
                          id="gender"
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

                  <p className="text-gray-400 text-sm">
                    Allowed JPG, GIF, or PNG. Max size of 800KB
                  </p>
                </>
              )}

              {activeTab === "password" && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="oldPassword"
                      className="block font-bold mb-2"
                    >
                      Old Password
                    </label>
                    <input
                      id="oldPassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="newPassword"
                      className="block font-bold mb-2"
                    >
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block font-bold mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
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
