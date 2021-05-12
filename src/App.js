import React, { Component } from "react";
import axios from "axios";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import UploadImages from "./Component/Upload.component";


function App() {
  return (
    <div className="container">
      <div className="content">
        <UploadImages />
      </div>
    </div>
  );
}


export default App;
