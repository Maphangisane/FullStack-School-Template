// ImageUploader.js
import React, { useState } from "react";
import axios from "axios";

const ImageUploader = ({ onUpload }) => {
  const [base64String, setBase64String] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    } else {
      setBase64String("");
      setSelectedFile(null);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("Please select a file");
        return;
      }

      const requestBody = {
        imageUrl: base64String,
        userId: userId,
      };

      // Make a POST request to the API endpoint using Axios
      const apiResponse = await axios.post(
        `http://localhost:8080/api/images/${userId}/upload`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      if (apiResponse.status === 201) {
        console.log("Image uploaded successfully:", apiResponse.data);
        onUpload();
        window.location.reload(); // loads current pages of the window
        // window.location.href = "" // redirection
      } else {
        console.error(
          "Unexpected status code:",
          apiResponse.status,
          apiResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <label>
        Choose Image File:
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>
      <button onClick={handleImageUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
