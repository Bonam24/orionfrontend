import React, { useState } from "react";
import axios from "axios";

const CallLogsUploadPage: React.FC = () => {
  const [id, setId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert("Please enter an ID");
      return;
    }

    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", file, file.name);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://calllogsservice.onrender.com/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(res.data);
    } catch (error: any) {
      console.error("Upload error:", error);
      setResponse(error.response?.data || { error: "Upload failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Call Logs Analyzer
        </h1>

        {/* Upload form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter user ID"
              className="mt-1 w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* File input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Call Logs (CSV)
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="mt-1"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Submit"}
          </button>
        </form>

        {/* API Response */}
        {response && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Analysis Results</h2>

            {response.analysis ? (
              <div className="space-y-3">
                <p className="text-green-600 font-medium">{response.message}</p>
                <p className="text-sm text-gray-600">
                  File stored at:{" "}
                  <a
                    href={response.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {response.file_url}
                  </a>
                </p>

                {/* Results table */}
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-3 py-2 text-left">Metric</th>
                      <th className="border px-3 py-2 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(response.analysis).map(
                      ([key, value], idx) => (
                        <tr key={idx}>
                          <td className="border px-3 py-2">{key}</td>
                          <td className="border px-3 py-2">{String(value)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap break-words bg-gray-100 p-4 rounded-md">
                {JSON.stringify(response, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLogsUploadPage;
