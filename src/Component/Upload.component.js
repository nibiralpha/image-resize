import React, { Component } from "react";
import UploadService from "../Service/upload.service";


export default class UploadImages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      images: []
    };

    this.onSelectFiles = this.onSelectFiles.bind(this);
    this.onDeleteFile = this.onDeleteFile.bind(this);
  }

  componentDidMount() {

  }

  onSelectFiles(e) {
    let selectedfFles = [...this.state.images, ...e.target.files];
    let filesToBeUploaded = [];

    for (let i = 0; i < selectedfFles.length; i++) {
      let selectedFile = selectedfFles[i];
      selectedFile.id = i;
      filesToBeUploaded.push(selectedFile);
    }

    this.setState({ images: filesToBeUploaded });
  }

  onDeleteFile(id) {

    let images = [...this.state.images];

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (image.id == id) {
        images.splice(i, 1);
      }
    }
    this.setState({ images: images });
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
        </div>

        {/* {console.log(images)} */}

        {images.length > 0 && (
          <>
            <div className="row mt-5 gx-3 gy-3">
              <h4 className="mb-3">Images to be uploaded</h4>
              {images.map((image) => (
                <div className="col-md-3">
                  <div className="img-thumb">
                    <div className="thumb"><img src={URL.createObjectURL(image)}></img></div>
                    <div className="thumb-close" onClick={() => this.onDeleteFile(image.id)}><img src="/close-icon.png"></img></div>
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
          </>
        )}

      </div>
    );
  }
}
