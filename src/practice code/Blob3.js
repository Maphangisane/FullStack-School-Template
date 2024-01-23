import React, { useState, useEffect } from "react";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");
  const userId = 1; // Replace with the actual user ID

  useEffect(() => {
    if (blobUrl) {
      saveBlobUrlToApi();
    }
  }, [blobUrl]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const blob = new Blob([file], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);
      setBlobUrl(blobUrl);
    }
  };

  const saveBlobUrlToApi = async () => {
    try {
      // Fetch the Blob data
      const response = await fetch(blobUrl);
      const blobData = await response.blob();

      // Assuming you want to use the blobUrl as imageUrl and userId as user_id
      const requestBody = JSON.stringify({
        imageUrl: blobUrl,
        userId: userId, // Assuming the server expects "userId" instead of "user_id"
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
        console.log("Blob URL saved successfully:", apiResponse.json());
      } else {
        console.error("Error saving Blob URL:", apiResponse.statusText);
      }
    } catch (error) {
      console.error("Error saving Blob URL:", error.message);
    }
  };

  return (
    <div>
      <form>
        <input type="file" onChange={handleFileChange} />
      </form>
      {selectedFile && (
        <div>
          <p>Selected File:</p>
          <img src={blobUrl} alt="Selected" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;
