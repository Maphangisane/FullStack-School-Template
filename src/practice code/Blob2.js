import React, { useState } from "react";

const FileToBlobUrl = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [blobUrl, setBlobUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      // Create a Blob from the file content
      const blob = new Blob([file], { type: file.type });

      // Generate a Blob URL
      const blobUrl = URL.createObjectURL(blob);
      setBlobUrl(blobUrl);
    }
  };
  //   console.log(selectedFile);
  //   console.log(selectedFile.type);
  //   console.log(selectedFile.name);
  //   console.log(blobUrl);

  //  fucntion to upload picture

  //   const blob =
  //     "blob:http://localhost:3000/aee68c1b-3a0f-4d37-a573-8051743e9aeb";
  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      {selectedFile && blobUrl && (
        <div>
          <p>Blob URL:{blobUrl}</p>
          <img src={blobUrl} alt="Selected" style={{ maxWidth: "100%" }} />
        </div>
      )}
      {/* 
      <img src={blob} alt="Selected" style={{ maxWidth: "100%" }} /> */}
    </div>
  );
};

export default FileToBlobUrl;
