import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import FooterBox from "./components/footerComponent/Footer";
import HomePage from "./components/Pages/HomePage/HomePage";
import AuthPage from "./components/Pages/AuthPage";
import UploadFiles from "./components/Pages/UploadFiles";
import ChatPage from "./components/Pages/Chat/ChatPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
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
        <FooterBox />
      </div>
    </Router>
  );
}

export default App;
