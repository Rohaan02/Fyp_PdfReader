import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  if (!user) {
    alert("Kindly log in, please!");
    return <Navigate to="/auth" replace />; // Redirect to auth page
  }

  return children; // Render the requested page if authenticated
};

export default PrivateRoute;
