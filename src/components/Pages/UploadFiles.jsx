import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Assuming Sidebar is reusable
import { FaUpload, FaTrashAlt, FaCloudUploadAlt } from 'react-icons/fa'; // Import the icons

const UploadPDF = () => {
  const [files, setFiles] = useState([]); // Manage uploaded files
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Multiple files

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleFileSelect = (event) => {
    const uploadedFiles = Array.from(event.target.files); // Allow multiple file selection
    setSelectedFiles(uploadedFiles);
  };

  const handleUploadFiles = () => {
    if (selectedFiles.length > 0) {
      setFiles([...files, ...selectedFiles]); // Add selected files to the existing list
      setShowUploadModal(false); // Close the modal after files are added
      setSelectedFiles([]); // Clear selected files after upload
    }
  };

  const handleDeleteFile = (fileToDelete) => {
    setFiles(files.filter((file) => file !== fileToDelete)); // Remove file from the list
  };

  const handleFinalUploadAction = () => {
    // Define the action that happens when the user clicks on the "Upload Files" button
    console.log('Final files uploaded:', files);
    alert('Files have been uploaded successfully!');
  };

  return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-grow p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">PDF Files</h1>

            {/* Upload Files Button - only shown when files are uploaded */}
            {files.length > 0 && (
                <button
                    onClick={handleFinalUploadAction}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center"
                >
                  <FaUpload className="mr-2" /> Upload Files {/* Upload Icon */}
                </button>
            )}
          </div>

          {/* File List or Empty State */}
          {files.length === 0 ? (
              <div className="text-center mt-12">
                <p className="text-gray-600 text-xl">No project files</p>
                <p className="text-gray-400 mb-4">Lorem ipsum dolor is simply dummy text.</p>
                <button
                    onClick={handleUploadClick}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Upload File
                </button>
              </div>
          ) : (
              <div className="grid grid-cols-4 gap-4">
                {files.map((file, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <span>{file.name}</span>
                          <button
                              onClick={() => handleDeleteFile(file)}
                              className="text-red-500 hover:text-red-600"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                        <p className="text-gray-500 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                ))}
              </div>
          )}

          {/* Upload File Modal */}
          {showUploadModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                  <h2 className="text-2xl font-bold mb-4">Upload Files</h2>
                  <div className="border-dashed border-2 p-6 rounded-lg text-center">
                    <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        multiple
                        onChange={handleFileSelect}
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer text-blue-500 underline flex flex-col items-center"
                    >
                      {/* Adding the upload cloud icon */}
                      <FaCloudUploadAlt className="text-5xl mb-2" />
                      Drag & drop files or <span className="text-blue-500 underline">Browse</span>
                    </label>
                    <p className="text-gray-500 mt-2">Supported formats: PDF</p>
                    {selectedFiles.length > 0 && (
                        <div className="mt-4">
                          {selectedFiles.map((file, index) => (
                              <div key={index} className="flex justify-between items-center mb-2">
                                <p>{file.name}</p>
                                <p className="text-sm text-gray-500">
                                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                              </div>
                          ))}
                        </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={() => setShowUploadModal(false)}
                        className="py-2 px-4 border rounded"
                    >
                      Cancel
                    </button>
                    <button
                        onClick={handleUploadFiles}
                        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default UploadPDF;
