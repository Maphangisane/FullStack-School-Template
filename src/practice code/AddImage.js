import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddImage = () => {
  //states
  const [images, setImages] = useState([]);

  // variables
  //   const navigate = useNavigate();

  // file input function
  const HandleChange = (e) => {
    const data = new FileReader();
    const file = e.target.files[0];
    data.addEventListener("loadend", () => {
      setImages(data.result);
    });
    data.readAsDataURL(file);
    //     console.log(imageUrl);
  };

  //   console.log(images);

  // add Member function
  //   const addImageHandler = async (image) => {
  //     // set id to submitted member and add to list
  //     const request = {
  //       id: uuidv4(),
  //       ...image,
  //     };
  //     // send data to database
  //     const response = await api.post("/images", request);
  //     // add to member
  //     setImages([...images, response.data]);
  //   };

  // submit function
  const add = (e) => {
    // prevents refresh
    e.preventDefault();
    // check if fields are filled
    // if (name === "" || jobTitle === "") {
    //   alert("All the fields are required!");
    //   return;
    // }

    // sets the
    //     addImageHandler({ image });

    // clear form

    setImages([]);

    // redirect
    //     navigate("/");
  };

  return (
    <div>
      {/* form heading */}
      <h2>Add image</h2>
      {/* file input */}
      <input
        className="UploadImage"
        id="fileInput"
        name="file"
        type="file"
        accept="image/*"
        onChange={HandleChange}
      />

      {/* image*/}
      <img className="ui avatar tiny image" src={images} alt="user" />
    </div>
  );
};

export default AddImage;
