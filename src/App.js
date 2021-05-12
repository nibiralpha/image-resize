import React, { Component } from "react";
import axios from "axios";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import UploadImages from "./Component/Upload.component";


function App() {
  return (
    <div className="container page-top">
      {/* <div className="row mb-4">
        <h1>Simaple image resize app</h1>
      </div> */}
      <div className="row">
        <div className="col-md-6">
          <UploadImages />
        </div>
      </div>
    </div>
  );
}


export default App;
