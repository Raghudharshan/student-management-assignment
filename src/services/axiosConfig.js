import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api", // Node.js API base URL
});

export default instance;