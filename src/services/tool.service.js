import axios from "axios";
import authHeader from "../services/auth-header";
import ServerHost from "../serverhosts";
const getTools = () => {
  const response = axios.get(ServerHost.apiInfoTools(), {
    headers: authHeader(),
  });
  return response.data;
};
export default { getTools };
