import React, { useState } from "react";
import { Label, FormGroup, Input, Form, Button } from "reactstrap";
import "./loginsignup.scss"

import api from "../../../api";

const Login = () => {
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

  const handleRedirect = (user) => {
    if (user.account.isSetup) {
      window.location.href = "/my-profile/";
    } else {
      window.location.href = "/create-hacker/";
    }
  }

  const handleLogin = async (event) => {
    console.log(event,'event')
    const {email,password} = loginState
    if (!email || !password)return
    let data
    try {
      data = await api.login(loginState.email, loginState.password);
      window.scrollTo({ top: 0, behavior: "smooth" });
      handleRedirect(data)
    } catch (err) {
      console.error('Error: ', err)
      setFailMessage(err)
      setLoginState({
      ...loginState,
      password:""
    });
      setTimeout(()=>setFailMessage(""),5000)
      return
    }
  };

  return (
    <div className="login-signup-card">
      <h2 className="text-left mb-4">Login</h2>
      <Form >
        <FormGroup>
          <Label className="mb-0" for="Email">
            Email
          </Label>
          <Input
            className="w-100 mb-4"
            type="email"
            value={loginState.email}
            name="email"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label className="mb-0" for="Password">
            Password
          </Label>
          <Input
            className="w-100"
            type="password"
            value={loginState.password}
            name="password"
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button
          disabled={false}
          className="btn btn-outline w-100 mt-2"
          color="outline-success"
          onClick={(e)=> handleLogin(e)}
        >
          Login
        </Button>
        <div className="fail-message">{failMessage}</div>
      </Form>
    </div>
  );
};

export default Login;
