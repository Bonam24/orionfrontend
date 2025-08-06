import axios from "axios";

export const analyzeCallLogs = async (file: File, id?: string) => {
  // if no id provided, generate a fake one
  const fakeId = id || `fake-id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const formData = new FormData();
  formData.append("file", file, file.name);  // attach file
  formData.append("id", fakeId);             // attach id field

  const response = await axios.post(
    "https://calllogsservice.onrender.com/analyze",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Save the JSON response to a file (frontend: trigger download)
  const blob = new Blob([JSON.stringify(response.data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `calllogs-analysis-${Date.now()}.json`;
  link.click();

  return response.data;
};
