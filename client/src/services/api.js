import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-stack-project-3-z5jd.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;