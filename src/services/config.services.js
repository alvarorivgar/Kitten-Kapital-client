import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
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
