// packages
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AddImage from "./practice code/AddImage";
// import Blob from "./practice code/Blob";
import Base64 from "./components/Base64";

function App() {
  return (
    <div className="App">
      {/* <AddImage /> */}
      {/* <Blob /> */}
      <Base64 />
    </div>
  );
}

export default App;
