import React, { useState, useEffect } from "react";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState("");
  const [uploadClicked, setUploadClicked] = useState(false);
  const userId = 2; // Replace with the actual user ID

  useEffect(() => {
    if (uploadClicked && base64String) {
      handleImageUpload();
      setUploadClicked(false); // Reset the uploadClicked state after the upload
    }
  }, [uploadClicked, base64String]);

  const handleFileChange = (event) => {
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

  const handleUploadClick = () => {
    setUploadClicked(true);
  };

  const handleImageUpload = async () => {
    try {
      // Assuming you want to use the base64String as imageUrl and userId as user_id
      const requestBody = JSON.stringify({
        imageUrl: base64String,
        userId: userId,
      });

      // Make a POST request to the API endpoint
      const apiResponse = await fetch(
        `http://localhost:8080/api/images/${userId}/upload`,
        {
          method: "POST",
          body: requestBody,
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      // Check the API response
      if (apiResponse.ok) {
        console.log("Base64 string saved successfully:", apiResponse.json());
      } else {
        console.error("Error saving Base64 string:", apiResponse.statusText);
      }
    } catch (error) {
      console.error("Error saving Base64 string:", error.message);
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
          <img src={base64String} alt="Selected" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
