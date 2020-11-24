import React, { useState } from "react";
import { Button } from "reactstrap";

import api from "../../../api";

const Login = (props) => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [failMessage, setFailMessage] = useState("")

  const handleInputChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async (e) => {
    console.log(props)
    const {email,password} = loginState
    if (!email || !password)return
    e.preventDefault();
    try {
      await api.login(loginState.email, loginState.password);
    } catch (err) {
      setFailMessage(err)
      setLoginState({
      ...loginState,
      password:""
    });
      setTimeout(()=>setFailMessage(""),5000)
      return
    }
    props.redirect("/my-profile/");
  };

  return (
    <div className="text-left bg-dark d-flex flex-column w-50 m-3 p-5">
      <h2 className="text-left mb-4">Login</h2>
      <form>
        <p className="mb-0">E-Mail Address</p>
        <input
          className="w-100 mb-4"
          type="email"
          value={loginState.email}
          name="email"
          onChange={handleInputChange}
        />
        <p className="mb-0">Password</p>
        <input
          className="w-100"
          type="password"
          value={loginState.password}
          name="password"
          onChange={handleInputChange}
        />

        <Button
          className="btn btn-outline w-100 mt-2"
          color="outline-success"
          onClick={(e) => handleClick(e)}
        >
          Login
        </Button>
      </form>
      {/* <p className="text-center mt-3">Forgot Password?</p> */}
      
        <div style={{minHeight:"8vh"}}className="text-danger">{failMessage}</div>
      
    </div>
  );
};

export default Login;
