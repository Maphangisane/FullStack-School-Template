import React, { useState } from "react";
import axios from "axios";

const FileToBase64 = () => {
  // file states
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Url, setBase64Url] = useState("");

  // function to save file as base64 url
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      // Use FileReader to read the file and convert it to a base64 URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Url(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(selectedFile);
  console.log(base64Url);
  //   console.log(selectedFile.type);

  // function to upload file to api endpoint
  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", base64Url);
        const userId = 1;

        console.log(formData);

        // Using Axios to upload the file to the specified endpoint with the user ID
        const response = await axios.post(
          `http://localhost:8080/api/images/${userId}/upload`,
          formData
        );

        // Assuming the server responds with the URL or other information
        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.log("No file selected");
    }
  };

  // http://localhost:8080/api/images/1/upload
  // @PostMapping("/{userId}/upload")
  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {selectedFile && (
        <div>
          <p>Base64 URL:</p>
          <img src={base64Url} alt="Selected" style={{ maxWidth: "100%" }} />
        </div>
      )}

      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileToBase64;
