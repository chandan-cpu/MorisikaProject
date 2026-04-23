import axios from "axios";

const api = axios.create({
  baseURL: "https://morisikaproject-3.onrender.com/api",
  withCredentials: true, // send cookies
});

export default api;
