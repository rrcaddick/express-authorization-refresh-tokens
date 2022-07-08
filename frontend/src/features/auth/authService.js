import axios from "axios";

const API_URL = "/api/users/";

// Register user
const registerUser = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
