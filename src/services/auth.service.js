import axios from "axios";
import ServerHosts from "../serverhosts";
const register = (username, email, password) => {
  return axios.post(ServerHosts.apiAuthRegister(), {
    username,
    email,
    password,
  });
};
const login = (email, password) => {
  return axios
    .post(ServerHosts.apiAuthLogin(), { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export default {
  register,
  login,
  logout,
  getCurrentUser,
};
