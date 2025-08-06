 import axios from "axios";

export const analyzeMpesa = async (file: File, password: string, id?: string) => {
  // generate fake ID if not provided
  const fakeId = id || `fake-id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const formData = new FormData();
  formData.append("file", file, file.name);
  formData.append("password", password);
  formData.append("id", fakeId);

  const response = await axios.post(
    "https://mpesaservice.onrender.com/analyzempesa", 
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  // 🔹 Trigger JSON file download in browser
  const blob = new Blob([JSON.stringify(response.data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `mpesa-analysis-${Date.now()}.json`;
  link.click();

  return response.data;
};


