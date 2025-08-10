import axios from "axios";

const api = axios.create({
  baseURL: "https://g2-cookbook.propulsion-learn.ch/backend/api/",
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyNjE3NTU0LCJpYXQiOjE3NTIxODU1NTQsImp0aSI6IjYxOWNiZjFmNzRhNTQzMmVhNjdlZThiNGM3NGI1Y2RmIiwidXNlcl9pZCI6NX0.xpLOgdlS30Bty3GyqEHx-HsmCuxJlPlH9r2H4MI7_64";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
