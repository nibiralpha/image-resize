import React, { Component } from "react";
import UploadService from "../Service/upload.service";


export default class UploadImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: [
        { id: Math.random(0, 10), url: "/og-image.png", resize: "110x110" },
        { id: Math.random(0, 10), url: "/og-image.png", resize: "110x110" },
        { id: Math.random(0, 10), url: "/og-image.png", resize: "110x110" },
        { id: Math.random(0, 10), url: "/og-image.png", resize: "110x110" },
        { id: Math.random(0, 10), url: "/og-image.png", resize: "110x110" },
      ]
    };

    this.onSelectFiles = this.onSelectFiles.bind(this);
  }

  componentDidMount() {

  }

  onSelectFiles(e) {
    console.log(e.target.files);
    let files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      console.log(file);
    }
  }

  render() {

    const images = this.state.images;
    return (
      <div className="upload-container">

        <div className="row">
          <div className="col-md-8">
            <label className="form-label" htmlFor="customFile">Upload image</label>
            <input multiple type="file" className="form-control" id="customFile" onChange={this.onSelectFiles} />
          </div>

          {/* <div className="col-md-4 relative">
            <button disabled="disabled" type="button" className="btn btn-primary bottom">Upload</button>
          </div> */}
        </div>

        <div className="row mt-5 gx-3 gy-3">
          <h4 className="mb-3">Images to be uploaded</h4>
          {images.map((image) => (
            <div className="col-md-3">
              <div className="img-thumb">
                <div className="thumb"><img src="/og-image.png"></img></div>
                <div className="thumb-close"><img src="/close-icon.png"></img></div>
              </div>
            </div>
          ))}

          <div className="col-md-3">
            <div className="img-thumb btn-thumb">
              <div className="thumb upload-btn-bg"><span className="upload-img">Upload all images</span></div>
            </div>
          </div>
         
          <div className="col-md-3">
            <div className="img-thumb btn-thumb">
              <div className="thumb remove-btn-bg"><span className="upload-img">Remove all images</span></div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}
