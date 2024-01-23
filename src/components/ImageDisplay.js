// ImageDisplay.js
import React from "react";

const ImageDisplay = ({ images, onEdit, onDelete }) => {
  const handleEdit = (id) => {
    onEdit(id);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div>
      {images.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {image.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={image.imageUrl}
                      alt={`Image ${image.id}`}
                      style={{ width: "5%", height: "auto" }}
                    />
                    {/* <div
                      style={{
                        position: "absolute",
                        bottom: "0",
                        width: "100%",
                        background: "rgba(255, 255, 255, 0.7)",
                        padding: "5px",
                        textAlign: "center",
                      }}
                    >
                      <button onClick={() => handleEdit(image.id)}>Edit</button>
                      <button onClick={() => handleDelete(image.id)}>
                        Delete
                      </button>
                    </div> */}
                  </div>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {image.userId}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
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

export default ImageDisplay;
