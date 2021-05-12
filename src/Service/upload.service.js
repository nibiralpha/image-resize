import http from "../common";

class FileUploadService {
  //file upload api
  upload(files) {
    return http.post("/upload", files, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }
}

export default new FileUploadService();


