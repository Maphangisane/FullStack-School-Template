import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUploadForm = () => {
  // states
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [uploadClicked, setUploadClicked] = useState(false);
  const userId = 2; // Replace with the actual user ID

  // useEffect
  useEffect(() => {
    if (uploadClicked && base64String) {
      handleImageUpload();
      setUploadClicked(false); // Reset the uploadClicked state after the upload
    }
  }, [uploadClicked, base64String]);

  // function to change file to string/url
  const handleFileChange = (event) => {
    // prevents refresh
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // function to handle upload click
  const handleUploadClick = () => {
    setUploadClicked(true);
  };

  // function to upload image
  const handleImageUpload = async () => {
    try {
      // Assuming you want to use the base64String as imageUrl and userId as user_id
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

      // Check the API response
      if (apiResponse.status === 201) {
        console.log("image saved successfully:", apiResponse.data);
      } else {
        console.error(
          "Unexpected status code:",
          apiResponse.status,
          apiResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
        <button type="button" onClick={handleUploadClick}>
          Upload
        </button>
      </form>
      {selectedFile && (
        <div>
          <p>Selected File:{base64String}</p>
          <img src={base64String} alt="Selected" style={{ maxWidth: "50%" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
