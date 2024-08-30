// axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API base URL
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request configuration before it is sent
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    console.log("Request:", config);
    return config;
  },
  (error) => {
    // Handle the request error
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that is within the range of 2xx will trigger this function
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Any status codes that fall outside the range of 2xx will trigger this function
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (like refreshing tokens)
      console.error("Unauthorized! Redirecting to login.");
      // Redirect or handle token refresh logic here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
