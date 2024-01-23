// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageDisplay from "../src/components/ImageDisplay";
import ImageUploader from "../src/components//ImageUploader";
import ImageEditForm from "../src/components//ImageEditForm";

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

  const handleUpdateImage = (id, updatedData) => {
    setEditingImageId(null);
    const updatedImages = images.map((image) =>
      image.id === id ? updatedData : image
    );
    setImages(updatedImages);
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/images/${id}/delete`
      );
      if (response.status === 200) {
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
        <ImageEditForm
          image={images.find((image) => image.id === editingImageId)}
          onUpdate={handleUpdateImage}
          onCancel={() => setEditingImageId(null)}
        />
      )}
    </div>
  );
};

export default App;
