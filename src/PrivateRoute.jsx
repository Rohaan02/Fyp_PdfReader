import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  if (!user) {
    toast.info("Kindly log in, please!");
    return <Navigate to="/auth" replace />; // Redirect to auth page
  }

  return children; // Render the requested page if authenticated
};

export default PrivateRoute;
