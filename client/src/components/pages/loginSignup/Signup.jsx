import React, { useState } from "react";
import { Button } from "reactstrap";

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

  const handleClick = async (e) => {
    e.preventDefault();
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
      console.log(err, "err");
    }
  };

  return (
    <div className="text-left bg-dark d-flex flex-column w-50 m-3 p-5">
      <h2 className="text-left mb-4">Register</h2>
      <form>
        <p className="mb-0">E-Mail Address</p>
        <input
          className="w-100 mb-4"
          type="email"
          value={signupState.email}
          name="email"
          onChange={handleInputChange}
        />

        <p className="mb-0">Password</p>
        <input
          /* disabled={true} */
          className="w-100"
          type="password"
          value={signupState.password}
          name="password"
          onChange={handleInputChange}
        />

        <Button
          className="btn btn-outline w-100 mt-2"
          color="outline-success"
          onClick={(e) => handleClick(e)}
          disabled={true}
        >
          Sign up
        </Button>
        <div style={{ minHeight: "8vh" }} className="text-danger">
          {failMessage}
        </div>
      </form>
    </div>
  );
};

export default Signup;
