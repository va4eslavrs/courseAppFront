import axios from "axios";
import ServerHosts from "../serverhosts";
import authHeader from "../services/auth-header";
const register = (username, email, password) => {
  return axios.post(ServerHosts.apiAuthRegister(), {
    username,
    email,
    password,
  });
};
const add = (text, tags, photos, theme, topic) => {
  return axios.post(
    ServerHosts.apiInfoAdd(),
    {
      text,
      tags,
      photos,
      theme,
      topic,
    },
    { headers: authHeader() }
  );
};
const privateContent = () => {
  return axios
    .get(ServerHosts.apiInfoPrivate(), { headers: authHeader() })
    .then((response) => {
      return response.data;
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
  privateContent,
  add,
  register,
  login,
  logout,
  getCurrentUser,
};
