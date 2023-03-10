import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5005/api",
});

service.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");
  const formattedToken = `Bearer ${storedToken}`;

  if (storedToken) {
    config.headers.authorization = formattedToken;
  }

  return config;
});

export default service;
