import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
const AdminBoard = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (err) => {
        const errContent =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        setContent(errContent);
      }
    );
  }, []);
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};
export default AdminBoard;
