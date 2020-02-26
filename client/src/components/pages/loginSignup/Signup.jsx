import React, { useState } from "react";

import api from "../../../api";

const Signup = props => {
  const [signupState, setSignupState] = useState({
    email: "",
    password: "",
    message: null
  });

  const handleInputChange = e => {
    setSignupState({
      ...signupState,
      [e.target.name]: e.target.value
    });
  };

  const handleClick = e => {
    e.preventDefault();
    const data = {
      email: signupState.email,
      password: signupState.password
    };
    api
      .signup(data)
      .then(result => {
        props.redirect("/create-hacker/");
      })
      .catch(err =>
        setSignupState({
          ...signupState,
          message: err.toString()
        })
      );
  };

  return (
    <div className="text-left bg-dark d-flex flex-column w-50 m-3 p-5">
      {signupState.message && (
        <div className="info info-danger">{signupState.message}</div>
      )}
      <h2 className="text-left">
        Register <span style={{ color: "#FFCC00" }}>- IT'S FREE!</span>
      </h2>
      <form>
        <p>E-Mail Address</p>
        <input
          className="w-100"
          type="text"
          value={signupState.email}
          name="email"
          onChange={handleInputChange}
        />
        <br />
        <p>Password</p>
        <input
          className="w-100"
          type="password"
          value={signupState.password}
          name="password"
          onChange={handleInputChange}
        />
        <br />
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={e => handleClick(e)}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
