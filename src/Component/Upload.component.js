import React, { Component } from "react";
import FileUploadService from "../Service/upload.service";


export default class UploadImages extends Component {

  constructor(props) {
    super(props)

    this.totalFileUploaded = 0;

    this.state = {
      images: [],
      isUploading: false,
      upload: false,
      resolution: "1080 x 1920"
    };

    this.onSelectFiles = this.onSelectFiles.bind(this);
    this.allFileUploaded = this.allFileUploaded.bind(this);
  }

  componentDidMount() {

  }

  onSelectFiles(e) {
    let selectedfFles = [...this.state.images, ...e.target.files];
    let filesToBeUploaded = [];

    for (let i = 0; i < selectedfFles.length; i++) {
      let selectedFile = selectedfFles[i];
      selectedFile.id = i;
      selectedFile.isValid = true;
      selectedFile.imgStatus = selectedFile.imgStatus === undefined ? "ACTIVE" : selectedFile.imgStatus;

      if (!this.verifyExtension(selectedFile.name)) {
        selectedFile.isValid = false;
      }

      filesToBeUploaded.push(selectedFile);
    }

    this.setState({ images: filesToBeUploaded, upload: false, isUploading: false });
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

  onRemoveAll() {
    if (this.state.isUploading) {
      return;
    }

    this.setState({ images: [] });
  }

  verifyExtension(name) {
    let ext = name.split(".");
    if (ext[ext.length - 1].toLowerCase() == "jpg" || ext[ext.length - 1].toLowerCase() == "png") {
      return true;
    }
    return false
  }

  onUpload() {

    if (this.state.isUploading) {
      return;
    }

    let data = {
      resolution: this.state.resolution
    };

    let images = this.state.images;
    images.forEach(image => {

      if (image.isValid && image.imgStatus != "SUCCESS") {
        image.imgStatus = "UPLOADING";
        FileUploadService.upload(image, data).then((res) => {
          this.onUploadSuccess(res.data);
        }).catch((err) => {
          console.log("upload error", err);
        });
      }
    });

    this.setState({ images: images, isUploading: true });
  }

  onUploadSuccess(successResponse) {
    let images = this.state.images;

    for (let i = 0; i < images.length; i++) {
      let image = images[i];

      if (image.id == parseInt(successResponse.data.id)) {
        image.imgStatus = "SUCCESS";
        this.totalFileUploaded++;
      }
    }

    this.setState({ images: images, upload: this.allFileUploaded() });
  }

  allFileUploaded() {
    let images = this.state.images;
    let totalSelectedFiles = 0;

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (image.isValid) {
        totalSelectedFiles++;
      }
    }

    if (this.totalFileUploaded == totalSelectedFiles) {
      return true;
    }

    return false;
  }

  render() {

    const images = this.state.images;
    return (
      <div className="upload-container">

        <div className="row">
          <div className="col-md-8">
            <label className="form-label" htmlFor="customFile">Upload image</label>
            <input multiple type="file" className="form-control" id="customFile" onChange={this.onSelectFiles}/>
            <br></br>
            <select className="form-select" defaultValue={this.state.resolution} onChange={(e) => this.setState({ resolution: e.target.value })}>
              <option value="1080x1920">1080x1920 (Instagram - story)</option>
              <option value="1080x1080">1080x1080 (Instagram - Square)</option>
              <option value="1200x628">1200x628 (Facebook - post)</option>
              <option value="1200x670">1200x670 (Twitter - post)</option>
              <option value="1280x720">1280x720 (Youtube - Thumbnail)</option>
            </select>
          </div>
        </div>

        {images.length > 0 && (
          <>
            <div className="row mt-5 gx-3 gy-3">
              <h4 className="mb-3">Images to be uploaded</h4>
              {images.map((image) => (
                <div className="col-md-3">
                  <div className={`img-thumb ${!image.isValid && 'danger-border'}`}>
                    <div className="thumb"><img src={URL.createObjectURL(image)}></img></div>

                    {image.imgStatus == "ACTIVE" && (
                      <div className="thumb-close" onClick={() => this.onDeleteFile(image.id)}><img src="/close-icon.png"></img></div>
                    )}

                    {image.imgStatus == "SUCCESS" && (
                      <div className="thumb-close"><img src="/success.png"></img></div>
                    )}

                    {!image.isValid && (
                      <div>Only jpg and png are allowed</div>
                    )}
                  </div>
                </div>
              ))}


              {!this.state.upload && (
                <div className="col-md-3">
                  <div className="img-thumb btn-thumb" onClick={() => this.onUpload()}>
                    <div className="thumb upload-btn-bg">
                      <span className="upload-img">{!this.state.isUploading ? 'Upload all images' : 'Uploading'}</span>
                    </div>
                  </div>
                </div>
              )}

              {!this.state.isUploading && (
                <div className="col-md-3">
                  <div className="img-thumb btn-thumb" onClick={() => this.onRemoveAll()}>
                    <div className="thumb remove-btn-bg"><span className="upload-img">Remove all images</span></div>
                  </div>
                </div>
              )}

              {this.state.upload && (
                <div>All files are uploaded</div>
              )}
            </div>
          </>
        )}

      </div>
    );
  }
}
