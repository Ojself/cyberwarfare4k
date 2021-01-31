import React, { useState } from "react";
import { Label, FormGroup, Input, Form, Button } from "reactstrap";
import "./loginsignup.scss";
import api from "../../../api";

const validateInput = (data) => {
  if (!data.email || !data.password) {
    return "Missing input";
  }
  if (data.email.indexOf("@") < 0) {
    return "Invalid Email";
  }
  if (data.password.length <= 5) {
    return "Too short password";
  }
};

const Signup = (props) => {
  const [signupState, setSignupState] = useState({
    email: "",
    password: "",
  });
  const [failMessage, setFailMessage] = useState("");

  const handleInputChange = (e) => {
    setSignupState({
      ...signupState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    const { email, password } = signupState;
    if (!email || !password) return;
    const data = {
      email: signupState.email,
      password: signupState.password,
    };
    const disAllowed = validateInput(data);
    if (disAllowed) {
      setSignupState({
        ...signupState,
        password: "",
      });
      setFailMessage(disAllowed);

      setTimeout(() => {
        setFailMessage("");
      }, 5000);
      return;
    }
    try {
      await api.signup(data);
      props.redirect("/create-hacker/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err, "err");
      setFailMessage(err);
    }
  };

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSignup();
    }
  };

  return (
    <div className="login-signup-card">
      <h2 className="text-left mb-4">Register</h2>
      <Form onKeyPress={(e) => onKeyUp(e)}>
        <FormGroup>
          <Label className="mb-0" for="Email">
            Email
          </Label>
          <Input
            className="w-100 mb-4"
            type="email"
            value={signupState.email}
            name="email"
            autoComplete="on"
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
            value={signupState.password}
            name="password"
            autoComplete="on"
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button
          disabled={false}
          className="btn btn-outline w-100 mt-2"
          color="outline-success"
          onClick={() => handleSignup()}
        >
          Sign up
        </Button>
        <div className="fail-message">{failMessage}</div>
      </Form>
    </div>
  );
};

export default Signup;
