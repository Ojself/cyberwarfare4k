import React, { useState, useEffect } from "react";
import api from "../../api";

const Login = ({ history }) => {
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
        console.log("SUCCESS!");
        history.push("/my-profile"); 
      })
      .catch(err => setLoginState({ ...loginState, message: err.toString() }));
  };

  return (
    <div className="Login">
      <h2>Login</h2>
      <form>
        email:
        <input
          type="text"
          value={loginState.email}
          name="email"
          onChange={handleInputChange}
        />
        <br />
        Password:
        <input
          type="password"
          value={loginState.password}
          name="password"
          onChange={handleInputChange}
        />
        <br />
        <button onClick={e => handleClick(e)}>Login</button>
      </form>
      {loginState.message && (
        <div className="info info-danger">{loginState.message}</div>
      )}
    </div>
  );
};

export default Login;
