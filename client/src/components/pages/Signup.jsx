import React, { useState, useEffect } from "react";
import api from "../../api";

const Signup = ({ history }) => {
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
        console.log("SUCCESS!");
        history.push("/"); // Redirect to the home page
      })
      .catch(err =>
        setSignupState({
          ...signupState,
          message: err.toString()
        })
      );
  };

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form>
        Email:{" "}
        <input
          type="text"
          value={signupState.email}
          name="email"
          onChange={handleInputChange}
        />{" "}
        <br />
        Password:{" "}
        <input
          type="password"
          value={signupState.password}
          name="password"
          onChange={handleInputChange}
        />{" "}
        <br />
        <button onClick={e => handleClick(e)}>Signup</button>
      </form>
      {signupState.message && (
        <div className="info info-danger">{signupState.message}</div>
      )}
    </div>
  );
};

export default Signup;
