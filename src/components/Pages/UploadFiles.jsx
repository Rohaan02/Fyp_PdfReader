import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Feather Icon configurations ---
import { Feather, X } from "react-feather";
//OR
// import * as Icon from "react-feather";

function UploadFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const navigate = useNavigate();

  const getLoggedInUser = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    return user ? { id: user._id, type: "User" } : "null";
  };

  const handleFileUpload = (newFiles) => {
    const pdfFiles = newFiles.filter((file) => file.type === "application/pdf");
    setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(newFiles);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    handleFileUpload(newFiles);
  };

  const handleFileRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleContinue = async () => {
    if (files.length === 0) {
      alert("Please upload at least one PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    // Fetch logged-in user information
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser || !loggedInUser.id) {
      // Explicit check for user and user ID
      alert("User not found, Please Login.");
      setLoading(false);
      return;
    }

    formData.append("userId", loggedInUser.id);
    formData.append("userType", loggedInUser.type);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setLoading(false);
        navigate("/chat");
      } else {
        setLoading(false);
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center p-5">
      <div
        className={`w-3/4 p-6 text-center border-2 border-dashed rounded-lg cursor-pointer 
          ${
            dragging
              ? "border-blue-500 bg-blue-100"
              : "border-gray-300 hover:bg-gray-100"
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <p className="mb-2 text-lg font-semibold">
            Upload a File "PDF Format"
          </p>
          <p className="text-gray-500">
            Drag and drop files here, or click to select files
          </p>
        </label>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-5 w-3/4">
        {files.map((file, index) => (
          <div
            key={index}
            className="relative p-4 text-center bg-gray-100 rounded-lg shadow"
          >
            <p className="mb-2 text-sm font-medium">{file.name}</p>
            <X
              className="absolute top-1 right-1 cursor-pointer text-red-500 hover:text-red-900"
              onClick={() => handleFileRemove(index)}
              size={24}
            />
            {/* or */}
            {/* <Icon.X /> */}
          </div>
        ))}
      </div>

      <button
        onClick={handleContinue}
        disabled={loading}
        className={`mt-5 px-6 py-2 rounded-lg text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default UploadFiles;
