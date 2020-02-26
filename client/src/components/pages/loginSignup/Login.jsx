import React, { useState } from "react";
import api from "../../../api";

import history from "../../history";

const Login = props => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    message: null
  });

  const handleInputChange = e => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = e => {
    e.preventDefault();
    api
      .login(loginState.email, loginState.password)
      .then(result => {
        props.redirect("/my-profile/");
      })
      .catch(err => setLoginState({ ...loginState, message: err.toString() }));
  };

  return (
    <div className="text-left bg-dark d-flex flex-column w-50 m-3 p-5">
      {loginState.message && (
        <div className="info info-danger">{loginState.message}</div>
      )}
      <h2 className="text-left">Login</h2>
      <form>
        <p>E-Mail Address</p>
        <input
          className="w-100"
          type="text"
          value={loginState.email}
          name="email"
          onChange={handleInputChange}
        />
        <p>Password</p>
        <input
          className="w-100"
          type="password"
          value={loginState.password}
          name="password"
          onChange={handleInputChange}
        />
        <br />
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={e => handleClick(e)}
        >
          Login
        </button>
      </form>
      <p className="text-center mt-3">Forgot Password?</p>
      {/* Todo, do something here. */}
    </div>
  );
};

export default Login;
