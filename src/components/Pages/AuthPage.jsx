import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import axios from "../../utils/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  // React Router's navigate function

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      alert("User is already logged in");
      navigate("/dashboard");  // Change to "/dashboard" instead of "/upload"
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const endpoint = isLogin ? "/auth/form-login" : "/auth/form-signup";

    try {
      const response = await axios.post(endpoint, formData);

      if (response.status === 200 || response.status === 201) {
        // If login/signup is successful, store user info in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard after successful login or signup
        navigate("/dashboard");  // Redirect to dashboard page instead of upload page
      } else {
        alert(isLogin ? "Login failed, check credentials" : "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong, please try again");
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const token = response.credential;
      const decodedToken = jwtDecode(token);

      const res = await axios.post("/auth/google-login", decodedToken);

      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Redirect to dashboard after Google login
        navigate("/dashboard");  // Redirect to dashboard page
      } else {
        alert("Google login failed, please try again.");
      }
    } catch (error) {
      alert("Google login failed, please try again.");
      console.error("Error:", error);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <GoogleOAuthProvider clientId={"your-client-id"}>
        <div className="flex min-h-screen">
          {/* Left Section for Image */}
          <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(src/assets/images/signup_picture.png)` }}></div>

          {/* Right Section for Form */}
          <div className="w-1/2 flex justify-center items-center bg-gradient-to-r from-blue-900 to-blue-400">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <div className="text-center text-2xl font-bold mb-4">
                {isLogin ? "Login Form" : "Signup Form"}
              </div>
              <div className="flex justify-between mb-6">
                <button
                    className={`w-full text-center py-2 ${isLogin ? "bg-blue-900 text-white" : "text-blue-900"} rounded-l-lg`}
                    onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                    className={`w-full text-center py-2 ${!isLogin ? "bg-blue-900 text-white" : "text-blue-900"} rounded-r-lg`}
                    onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                {isLogin ? (
                    <>
                      <div className="mb-4">
                        <input
                            type="text"
                            name="identifier"
                            placeholder="Username or Email"
                            required
                            value={formData.identifier}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                      </div>
                    </>
                ) : (
                    <>
                      <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                        />
                      </div>
                      <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                      </div>
                      <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500"
                        />
                        <span
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                      </div>
                    </>
                )}
                <div className="flex justify-between items-center mb-4">
                  {isLogin && (
                      <Link to="/reset-password" className="text-blue-500">  {/* Update the forgot password link */}
                        Forgot password?
                      </Link>
                  )}
                  <button type="submit" className="bg-blue-900 text-white w-full py-3 rounded-lg hover:bg-blue-700">
                    {isLogin ? "Login" : "Signup"}
                  </button>
                </div>
                <p className="text-center font-bold">OR</p>
                <div className="flex justify-center">
                  <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => alert("Login Failed")}
                  />
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
        </div>
      </GoogleOAuthProvider>
  );
};

export default AuthPage;
