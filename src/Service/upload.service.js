import http from "../common";

class FileUploadService {
  upload(file) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new FileUploadService();


