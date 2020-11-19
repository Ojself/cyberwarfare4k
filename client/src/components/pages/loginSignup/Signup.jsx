import React, { useState } from "react";
import { Button } from "reactstrap";

import api from "../../../api";

const Signup = (props) => {
  const [signupState, setSignupState] = useState({
    email: "",
    password: "",
    message: null,
  });

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
    try {
      await api.signup(data);
      props.redirect("/create-hacker/");
    } catch (err) {
      console.log(err, "err");
    }
    /* setSignupState({
          ...signupState,
          message: err.toString()
        }) */
  };

  return (
    <div className="text-left bg-dark d-flex flex-column w-50 m-3 p-5">
      {signupState.message && (
        <div className="info info-danger">{signupState.message}</div>
      )}
      <h2 className="text-left mb-4">
        Register {/* <p style={{ color: "#FFCC00" }}>- IT'S FREE!</p> */}
      </h2>
      <form>
        <p className="mb-0">E-Mail Address</p>
        <input
          className="w-100 mb-4"
          type="text"
          value={signupState.email}
          name="email"
          onChange={handleInputChange}
        />

        <p className="mb-0">Password</p>
        <input
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
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
