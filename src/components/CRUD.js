import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageDisplay = ({ images, onEdit, onDelete }) => {
  const handleEdit = (id) => {
    // Call the onEdit callback to trigger the edit functionality
    onEdit(id);
  };

  const handleDelete = (id) => {
    // Call the onDelete callback to trigger the deletion
    onDelete(id);
  };

  return (
    <div>
      {images.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>User ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image.id}>
                <td>{image.id}</td>
                <td>
                  <img src={image.imageUrl} alt={`Image ${image.id}`} />
                </td>
                <td>{image.userId}</td>
                <td>
                  <button onClick={() => handleEdit(image.id)}>Edit</button>
                  <button onClick={() => handleDelete(image.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

const ImageUploader = ({ onUpload }) => {
  const [base64String, setBase64String] = useState("");
  const [userId, setUserId] = useState("");

  const handleImageUpload = async () => {
    try {
      const requestBody = {
        imageUrl: base64String,
        userId: userId,
      };

      const apiResponse = await axios.post(
        "http://localhost:8080/api/images/upload",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (apiResponse.status === 201) {
        console.log("Image uploaded successfully:", apiResponse.data);
        onUpload(); // Trigger a refresh of the image list after upload
      } else {
        console.error(
          "Unexpected status code:",
          apiResponse.status,
          apiResponse.statusText
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <label>
        Base64 Image String:
        <input
          type="text"
          value={base64String}
          onChange={(e) => setBase64String(e.target.value)}
        />
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

const App = () => {
  const [images, setImages] = useState([]);
  const [editingImageId, setEditingImageId] = useState(null);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/images/all"
        );
        if (response.status === 200) {
          setImages(response.data);
        } else {
          console.error(
            "Unexpected status code:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchAllImages();
  }, []);

  const handleEditImage = (id) => {
    setEditingImageId(id);
  };

  const handleUpdateImage = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/images/${id}/update`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image updated successfully:", response.data);
        setEditingImageId(null);
        // Refresh the image list after update
        const updatedImages = images.map((image) =>
          image.id === id ? response.data : image
        );
        setImages(updatedImages);
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

  const handleDeleteImage = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/images/${id}/delete`
      );
      if (response.status === 200) {
        // Remove the deleted image from the state
        setImages((prevImages) =>
          prevImages.filter((image) => image.id !== id)
        );
        console.log("Image deleted successfully");
      } else {
        console.error(
          "Unexpected status code:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      <h1>Image Management</h1>
      <ImageUploader onUpload={() => setEditingImageId(null)} />
      <ImageDisplay
        images={images}
        onEdit={handleEditImage}
        onDelete={handleDeleteImage}
      />
      {editingImageId && (
        <div>
          <h2>Edit Image</h2>
          {/* Assuming you have an edit form or input fields here */}
          <button onClick={() => setEditingImageId(null)}>Cancel Edit</button>
        </div>
      )}
    </div>
  );
};

export default App;
