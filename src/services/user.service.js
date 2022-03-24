import axios from "axios";
import authHeader from "./auth-header";
import ServerHosts from "../serverhosts";

const getPublicContent = () => {
  return axios.get(ServerHosts.all());
};
const getUserBoard = () => {
  return axios.get(ServerHosts.apiTestUserBoard(), { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(ServerHosts.apiTestAdminBoard(), { headers: authHeader() });
};
export default {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};
