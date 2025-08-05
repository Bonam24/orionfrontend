import React, { useState } from "react";
import axios from "axios";

const UploadCSV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [userId, setUserId] = useState(""); // ✅ input for user ID
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
      setAnalysis(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file first.");
      return;
    }
    if (!userId) {
      setError("Please enter a User ID.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", userId); // ✅ send user ID

      const response = await axios.post("http://localhost:5001/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(response.data); // ✅ store analysis JSON
      setError(null);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-xl font-bold">Upload Call Logs CSV</h1>

      {/* User ID input */}
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border rounded px-3 py-2 w-full"
      />

      {/* File input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border rounded px-3 py-2 w-full"
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload & Analyze"}
      </button>

      {/* Error display */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Show analysis results */}
      {analysis && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h2 className="font-bold text-lg">📊 Analysis Result</h2>
          <pre className="text-sm whitespace-pre-wrap">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default UploadCSV;
