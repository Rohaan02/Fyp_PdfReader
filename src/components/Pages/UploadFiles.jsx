import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "react-feather";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [uploadSessionId, setUploadSessionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSessionId = localStorage.getItem("uploadSessionId");
    setUploadSessionId(storedSessionId ? parseInt(storedSessionId) : 1);
  }, []);

  const getLoggedInUser = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    return user ? { id: user._id, type: "User" } : "null";
  };

  const truncateFileName = (fileName, maxLength = 17) => {
    return fileName.length > maxLength
      ? `${fileName.substring(0, maxLength)}...`
      : fileName;
  };

  const handleFileUpload = (newFiles) => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser === "null") {
      toast.warn("User not found. Please log in.");
      return;
    }

    const pdfFiles = newFiles.filter((file) => {
      if (file.type !== "application/pdf") {
        toast.warn(`${file.name} is not a PDF file.`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.warn(`${file.name} exceeds the 5MB file size limit.`);
        return false;
      }
      return true;
    });

    const renamedFiles = pdfFiles.map((file) => {
      const newFileName = `${uploadSessionId}_${loggedInUser.id}_${file.name}`;
      return {
        originalFile: file,
        displayName: file.name, // Show original file name
        size: (file.size / (1024 * 1024)).toFixed(2), // Convert size to MB
      };
    });

    setFiles((prevFiles) => [...prevFiles, ...renamedFiles]);
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
      toast.warn("Please upload at least one PDF file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file.originalFile));

    const loggedInUser = getLoggedInUser();
    if (!loggedInUser || !loggedInUser.id) {
      toast.warn("User not found. Please log in.");
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
        const data = await response.json();
        if (data.filePaths) {
          localStorage.setItem(
            "recentUploadedFilePath",
            JSON.stringify(data.filePaths)
          );
        }
        setLoading(false);
        toast.success("Files uploaded successfully!");
        navigate("/chat");
      } else {
        setLoading(false);
        toast.error("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
      toast.error("🚨 Server error. Please try again later.");
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
            className="relative p-4 flex items-center justify-between bg-gray-100 rounded-lg shadow w-80"
          >
            <div>
              <p className="text-sm font-medium truncate">
                {truncateFileName(file.displayName)}
              </p>
              <p className="text-xs text-gray-500">{file.size} MB</p>
            </div>
            <Trash2
              className="cursor-pointer text-red-500 hover:text-red-900"
              onClick={() => handleFileRemove(index)}
              size={24}
            />
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
