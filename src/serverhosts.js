const host = () => {
  return "http://localhost:8083/";
};
const all = () => {
  return apiTest() + "all";
};
const api = () => {
  return host() + "api/";
};
const apiTest = () => {
  return api() + "test/";
};
const apiAuth = () => {
  return api() + "auth/";
};
const apiAuthRegister = () => {
  return apiAuth() + "signup";
};
const apiAuthLogin = () => {
  return apiAuth() + "signin";
};
const apiAuthLogout = () => {
  return apiAuth() + "logout";
};
const apiTestUserBoard = () => {
  return apiTest() + "user";
};
const apiTestAdminBoard = () => {
  return apiTest() + "admin";
};

export default {
  host,
  all,
  apiAuth,
  apiTestUserBoard,
  apiTestAdminBoard,
  apiAuthLogin,
  apiAuthRegister,
  apiAuthLogout,
};
