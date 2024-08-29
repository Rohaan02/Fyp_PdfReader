import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/images/Google_Icons.png";
import { GoogleLogin } from "@react-oauth/google";

const AuthPage = () => {
  const handleSuccess = (response) => {
    console.log("Login Success:", response);
    // Process the response (e.g., send to your backend)
  };

  const handleError = (error) => {
    console.error("Login Error:", error);
    // Handle errors
  };
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate successful login/signup and redirect
    navigate("/upload-files");
  };

  return (
    <div className="flex py-10 min-h-screen justify-center items-center bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center text-2xl font-bold mb-4">
          {isLogin ? "Login Form" : "Signup Form"}
        </div>
        <div className="flex justify-between mb-6">
          <button
            className={`w-full text-center py-2 ${
              isLogin ? "bg-blue-900 text-white" : "text-blue-900"
            } rounded-l-lg`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-full text-center py-2 ${
              !isLogin ? "bg-blue-900 text-white" : "text-blue-900"
            } rounded-r-lg`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
              />
            </div>
          )}
          <div className="flex justify-between items-center mb-4">
            {isLogin && (
              <a href="#" className="text-blue-500">
                Forgot password?
              </a>
            )}
            <button
              type="submit"
              className="bg-blue-900 text-white w-full py-3 rounded-lg hover:bg-blue-700"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <p className="text-center font-bold">OR</p>

          <div className="flex justify-center">
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          </div>
          {isLogin ? (
            <div className="text-center mt-4">
              Not a member?{" "}
              <button onClick={handleToggle} className="text-blue-500">
                Signup now
              </button>
            </div>
          ) : (
            <div className="text-center mt-4">
              Already a member?{" "}
              <button onClick={handleToggle} className="text-blue-500">
                Login now
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
