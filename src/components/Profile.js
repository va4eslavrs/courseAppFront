import React from "react";
import AuthService from "../services/auth.service";
const Profile = () => {
  const currentUsr = AuthService.getCurrentUser();
  return (
    <div className="container">
      {currentUsr.token && (
        <p>
          <strong>accessToken:</strong>
          {currentUsr.token.substring(0, 20)}...{" "}
          {currentUsr.token.substring(20)}
        </p>
      )}

      <p>
        <strong>ID:</strong>
        {currentUsr.id}
      </p>
      <p>
        <strong>Email:</strong>
        {currentUsr.email}
      </p>

      <strong>Authorities:</strong>
      <ul>
        <strong>is any authorities{currentUsr.roles}</strong>
        {currentUsr.roles &&
          currentUsr.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
