// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId="356715745812-or5ri7vshpqsim8st9be6n3im97gv9he.apps.googleusercontent.com">
//       <App />
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "356715745812-or5ri7vshpqsim8st9be6n3im97gv9he.apps.googleusercontent.com"; // Replace with your actual Google Client ID

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
  // </React.StrictMode>
);
