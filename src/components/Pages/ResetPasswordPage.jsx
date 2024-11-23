import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Call your reset password API here
        console.log("Password reset successfully:", newPassword);
        alert("Password reset successfully!");
        navigate("/auth"); // Navigate back to the Auth Page
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Section for Image */}
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(src/assets/images/reset_password_picture.png)` }}>
            </div>

            {/* Right Section for Reset Password Form */}
            <div className="w-1/2 flex justify-center items-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Reset Password?</h2>
                    <p className="text-center mb-6">
                        Please input your new desired password in the field below to create a new password and regain access to your account.
                    </p>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 rounded-lg border border-gray-300"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Reset Password
                        </button>
                    </form>
                    <button
                        onClick={() => navigate("/auth")}
                        className="mt-4 w-full bg-gray-200 text-blue-500 py-3 rounded-lg hover:bg-gray-300 transition duration-300"
                    >
                        Back to Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
