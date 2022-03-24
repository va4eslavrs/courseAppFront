export default function authHeader() {
  const userObj = JSON.parse(localStorage.getItem("user"));

  return userObj && userObj.token
    ? { Authorization: "Bearer " + userObj.token }
    : {};
}
