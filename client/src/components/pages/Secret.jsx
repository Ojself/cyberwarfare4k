import React, { useState, useEffect } from "react";
// import api from "../../api";

const Secret = ({}) => {
  const [secretState, setSecretState] = useState({
    name: ""
  });

  useEffect(() => {
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2>Secret</h2>
    </div>
  );
};
export default Secret;
