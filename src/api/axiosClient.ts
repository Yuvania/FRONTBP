import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7019/api", // Cambiar si tu backend está en otro puerto
});

export default axiosClient;
