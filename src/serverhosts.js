const host = () => {
  //return "http://localhost:8083/";
  return "https://hidden-brook-67114.herokuapp.com/";
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
const apiInfo = () => {
  return api() + "info/";
};
const apiInfoPublic = () => {
  return apiInfo() + "public";
};
const apiInfoPrivate = () => {
  return apiInfo() + "private";
};
const apiInfoAdd = () => {
  return apiInfo() + "add";
};
const apiInfoEdit = () => {
  return apiInfo() + "edit";
};
const apiInfoTools = () => {
  return apiInfo() + "tools";
};
const apiInfoDelete = () => {
  return apiInfo() + "delete";
};
const apiInfoLike = () => {
  return apiInfo() + "like";
};

export default {
  all,
  apiAuth,
  apiTestUserBoard,
  apiTestAdminBoard,
  apiAuthLogin,
  apiAuthRegister,
  apiAuthLogout,
  apiInfoLike,
  apiInfoDelete,
  apiInfoPrivate,
  apiInfoPublic,
  apiInfoAdd,
  apiInfoEdit,
  apiInfoTools,
};
