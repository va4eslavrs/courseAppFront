import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { isEmail } from "validator";
const required = (value) => {
  if (!value)
    return (
      <div className="alert alert-danger" role="alert">
        field is required
      </div>
    );
};
const validEmail = (value) => {
  if (!isEmail(value))
    return (
      <div className="alert alert-danger" role="alert">
        invalid email
      </div>
    );
};
const validUsername = (value) => {
  if (value.length < 3 || value.length > 20)
    return (
      <div className="alert alert-danger" role="alert">
        username must be 3-20 symbols
      </div>
    );
};
const validPassword = (value) => {
  if (value.length < 2 || value.length > 40)
    return (
      <div className="alert alert-danger" role="alert">
        password must be 2-40 symbols
      </div>
    );
};
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess("false");
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccess(true);
        },
        (err) => {
          const errMessage =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          setMessage(errMessage);
          setSuccess(false);
        }
      );
    }
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleRegister} ref={form}>
          {!success && (
            <div>
              <div className="form-group">
                <label htmlFor="username">username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, validUsername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <Input
                  className="form-control"
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <Input
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, validPassword]}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <button type="Submit" className="btn btn-primary btn-block">
                  signup
                </button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={
                  success ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};
export default Register;
