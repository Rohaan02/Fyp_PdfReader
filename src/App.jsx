import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import FooterBox from "./components/footerComponent/Footer";
import HomePage from "./components/Pages/HomePage/HomePage";
import AuthPage from "./components/Pages/AuthPage";
import UploadFiles from "./components/Pages/UploadFiles";
import ChatPage from "./components/Pages/ChatPage";
import axiosInstance from "./utils/axios";
import Dashboard from "./components/Pages/Dashboard.jsx";
import ProfilePage from "./components/Pages/ProfilePage.jsx";
import ResetPasswordPage from "./components/Pages/AuthPage";

// Initialize axios instance
axiosInstance();

function App() {
  return (
      <>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Routes>
              {/* Define your routes with element (not component) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadFiles />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
            <FooterBox />
          </div>
        </Router>
      </>
  );
}

export default App;
