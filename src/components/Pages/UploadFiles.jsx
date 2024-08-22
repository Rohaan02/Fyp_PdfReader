import React, { useState } from "react";

function UploadFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

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
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const response = await fetch("/api/upload", {
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
            <button
              onClick={() => handleFileRemove(index)}
              className="absolute top-1 right-1 text-red-500 text-xl hover:text-red-700"
            >
              ✖
            </button>
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
        {loading ? "Extracting..." : "Continue"}
      </button>
    </div>
  );
}

export default UploadFiles;
