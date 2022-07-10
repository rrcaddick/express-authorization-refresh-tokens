import axios from "axios";
import { authAxios } from "../../config/axiosInterceptor";

const API_URL = "/api/auth";

// Register user
const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

const refreshToken = async () => {
  const response = await authAxios.get(`${API_URL}/refreshToken`);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  localStorage.removeItem("user");
  return response.data;
};

const authService = {
  registerUser,
  loginUser,
  refreshToken,
  logout,
};

export default authService;
