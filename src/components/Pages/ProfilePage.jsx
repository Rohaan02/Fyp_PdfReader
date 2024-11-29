import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const localStorageData = localStorage.getItem("user");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      parsedData.newEmail = parsedData.email;
      setUserData(parsedData);
      setIsGoogleUser(!!parsedData.googleId);

      if (!parsedData.googleId) {
        const avatar = localStorage.getItem("userAvatar");
        setUserAvatar(avatar);
      }
    }
  }, []);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const saveUserData = async () => {
    if (!isGoogleUser && userData) {
      try {
        const payload = {
          email: userData.email, // Current email
          username: userData.username,
        };

        // Check if a new email is provided
        if (userData.newEmail) {
          payload.newEmail = userData.newEmail; // Include new email
        }

        // Check if a new password is provided
        if (userData.oldPassword && userData.newPassword) {
          payload.password = userData.newPassword; // Include new password
        }

        const response = await axios.put(
          "http://localhost:5000/auth/update-user",
          payload
        );

        if (response.data.success) {
          // Update localStorage and state
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userData,
              email: payload.newEmail || userData.email,
            })
          );
          toast.success("🎉 Profile updated successfully!");
        } else {
          toast.error("Failed to update profile. " + response.data.message);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("An error occurred while updating the profile.");
      }
    }
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 border-r-2 pr-6">
            <h3 className="text-lg font-semibold mb-4">Profile</h3>
            <p className="text-sm text-gray-500 mb-6">
              Welcome to your profile! Here you can view and manage your
              personal information.
            </p>
            <nav className="space-y-4">
              <button
                className={`flex items-center space-x-2 w-full font-semibold ${
                  activeTab === "general"
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab("general")}
              >
                <FaUser className="text-xl" />
                <span>General</span>
              </button>
              {!isGoogleUser && (
                <button
                  className={`flex items-center space-x-2 w-full font-semibold ${
                    activeTab === "changePassword"
                      ? "text-blue-500"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                  onClick={() => setActiveTab("changePassword")}
                >
                  <FaLock className="text-xl" />
                  <span>Change Password</span>
                </button>
              )}
            </nav>
          </div>

          {/* Profile Content */}
          <div className="w-3/4 pl-6">
            {activeTab === "general" && (
              <div>
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      isGoogleUser
                        ? userData.avatar
                        : userAvatar || "https://via.placeholder.com/150"
                    }
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full border object-cover"
                  />
                  <div>
                    <p className="text-lg font-medium">
                      {isGoogleUser
                        ? userData.name
                        : userData.username || "Unknown User"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Welcome to your profile!
                    </p>
                  </div>
                </div>

                {/* Form Section */}
                <form className="mt-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {/* First Name / Username */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600">
                        {isGoogleUser ? "First Name" : "Username"}
                      </label>
                      <input
                        type="text"
                        value={
                          isGoogleUser
                            ? userData.name.split(" ")[0]
                            : userData.username
                        }
                        onChange={(e) => {
                          if (!isGoogleUser) {
                            setUserData({
                              ...userData,
                              username: e.target.value,
                            });
                          }
                        }}
                        className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        readOnly={isGoogleUser}
                      />
                    </div>

                    {/* Last Name (Google Users Only) */}
                    {isGoogleUser && (
                      <div>
                        <label className="block text-sm font-medium text-gray-600">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={userData.name.split(" ")[1] || ""}
                          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                          readOnly
                        />
                      </div>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userData.newEmail}
                      onChange={(e) => {
                        if (!isGoogleUser) {
                          setUserData({
                            ...userData,
                            newEmail: e.target.value,
                          });
                        }
                      }}
                      className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      readOnly={isGoogleUser}
                    />
                  </div>
                </form>

                {/* Save Button */}
                {!isGoogleUser && (
                  <div className="flex space-x-4 mt-6">
                    <button
                      type="button"
                      className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={saveUserData}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Password Change Tab */}
            {activeTab === "changePassword" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Change Password</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (userData.newPassword !== userData.confirmPassword) {
                      toast.error("Passwords do not match!");
                      return;
                    }
                    saveUserData();
                  }}
                  className="grid grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Old Password
                    </label>
                    <div className="flex items-center border rounded-md px-4 py-2">
                      <input
                        type={showPassword.oldPassword ? "text" : "password"}
                        value={userData.oldPassword || ""}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            oldPassword: e.target.value,
                          })
                        }
                        className="flex-1 outline-none"
                        placeholder="Enter old password"
                      />
                      <button
                        type="button"
                        className="text-gray-400"
                        onClick={() => togglePasswordVisibility("oldPassword")}
                      >
                        {showPassword.oldPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      New Password
                    </label>
                    <div className="flex items-center border rounded-md px-4 py-2">
                      <input
                        type={showPassword.newPassword ? "text" : "password"}
                        value={userData.newPassword || ""}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            newPassword: e.target.value,
                          })
                        }
                        className="flex-1 outline-none"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        className="text-gray-400"
                        onClick={() => togglePasswordVisibility("newPassword")}
                      >
                        {showPassword.newPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Confirm Password
                    </label>
                    <div className="flex items-center border rounded-md px-4 py-2">
                      <input
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
                        value={userData.confirmPassword || ""}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="flex-1 outline-none"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        className="text-gray-400"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                      >
                        {showPassword.confirmPassword ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-end space-x-4">
                    <button
                      type="reset"
                      className="py-2 px-6 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
