// ImageEditForm.js
import React, { useState } from "react";
import axios from "axios";

const ImageEditForm = ({ image, onUpdate, onCancel }) => {
  const [updatedData, setUpdatedData] = useState({
    imageUrl: image.imageUrl,
    userId: image.userId,
  });

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/images/${image.id}/update`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image updated successfully:", response.data);
        onUpdate(image.id, response.data);
      } else {
        console.error(
          "Unexpected status code:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setUpdatedData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   };

  const handleChange = (e) => {
    const { name, files } = e.target;

    if (name === "imageUrl" && files.length > 0) {
      // For file input, read the file content using FileReader
      const reader = new FileReader();
      reader.onload = (event) => {
        setUpdatedData((prevData) => ({
          ...prevData,
          imageUrl: event.target.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div>
      <h2>Edit Image</h2>
      {/* Input fields for editing */}
      <label>
        Image upload:
        <input type="file" name="imageUrl" onChange={handleChange} />
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={updatedData.imageUrl}
          onChange={handleChange}
        />
      </label>

      <label>
        User ID:
        <input
          type="text"
          name="userId"
          value={updatedData.userId}
          onChange={handleChange}
        />
      </label>

      {/* Add more input fields as needed */}

      <button onClick={handleUpdate}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default ImageEditForm;
