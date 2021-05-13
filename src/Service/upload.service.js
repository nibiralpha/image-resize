import http from "../common";

class FileUploadService {
  upload(file, data) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("id", file.id);
    formData.append("resolution", data.resolution);

    return http.post("/api/file/upload", formData, {
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


