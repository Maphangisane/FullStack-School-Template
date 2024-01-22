import React, { useState, useEffect } from "react";
import "../styles/gallery.css";
import axios from "axios";
import image1 from "../assets/IMG5.JPG";

function Gallery() {
  // states
  const [imageUrls, setImageUrls] = useState([]);

  // Use Effect
  useEffect(() => {
    // Fetch image URLs from the Spring Boot backend using Axios
    axios
      .get("http://localhost:8080/api/images/all")
      .then((response) => {
        // Assuming the response is an array of image URLs
        const imageUrls = response.data.map((item) => item.imageUrl);
        setImageUrls(imageUrls);
        // console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching image URLs:", error);
      });
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  //   console.log(imageUrls[0]);

  // redirect
  function directPage() {
    window.location.href = "src/components/GalleryPage.js";
  }

  return (
    <div className="gallery-section">
      <div className="container">
        <div className="section-title">
          <span className="subtitle">gallery</span>
          <h1>School gallery</h1>
        </div>

        {/* First page-row */}
        <div className="page-row">
          <div className="gallery_row gallery_row_one">
            {imageUrls.slice(0, 2).map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
            ))}
          </div>
          <div className="gallery_row gallery_row_two">
            {imageUrls.slice(2, 4).map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index + 3}`} />
            ))}
          </div>
          <div className="gallery_row gallery_row_three">
            {imageUrls.slice(4, 6).map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index + 5}`} />
            ))}
          </div>
        </div>

        <div id="gallery_btn" onClick={directPage}>
          more images...
        </div>
      </div>
    </div>
  );
}

export default Gallery;
