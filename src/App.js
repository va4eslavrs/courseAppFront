//import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import UserBoard from "./components/UserBoard";
import AdminBoard from "./components/AdminBoard";
import CreatePost from "./components/CreatePost";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [shomAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUsr, setCurrentUsr] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUsr(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          App
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {shomAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin board
              </Link>
            </li>
          )}
          {currentUsr && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                UserBoard
              </Link>
            </li>
          )}
        </div>
        {currentUsr ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/create"} className="nav-link">
                {currentUsr.name} Add your post
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                signin
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                signup
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/create"} component={CreatePost} />
          <Route exact path={"/user"} component={UserBoard} />
          <Route exact path={"/admin"} component={AdminBoard} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
