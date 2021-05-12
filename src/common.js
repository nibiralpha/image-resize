import axios from "axios";
import Config from "./config";

export default axios.create({
  baseURL: Config.baseurl,
  headers: {
    "Content-type": "application/json"
  }
});
