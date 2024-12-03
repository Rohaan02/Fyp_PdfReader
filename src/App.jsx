import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import FooterBox from "./components/footerComponent/Footer";
import HomePage from "./components/Pages/HomePage/HomePage";
import AuthPage from "./components/Pages/AuthPage";
import UploadFiles from "./components/Pages/UploadFiles";
import ChatPage from "./components/Pages/Chat/ChatPage";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "./components/Pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <div>
          <SideBar
            isSidebarMinimized={isSidebarMinimized}
            setIsSidebarMinimized={setIsSidebarMinimized}
          />
          <div className="flex flex-1">
            <main
              className={`flex-1 ${isSidebarMinimized ? "ml-16" : "ml-64"} p-4`}
            >
              <ToastContainer />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/upload"
                  element={
                    <PrivateRoute>
                      <UploadFiles />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <PrivateRoute>
                      <ChatPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
        <FooterBox />
      </div>
    </Router>
  );
}

export default App;
