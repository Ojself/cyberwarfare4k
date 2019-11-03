import React, { useState, useEffect } from "react";
// import api from "../../api";

const Arcade = ({}) => {
  const [allianceState, setAllianceState] = useState({
    name: ""
  });

  useEffect(() => {
    console.log("logging");
  }, []);

  return (
    <div>
      <h2>arcade</h2>
    </div>
  );
};

export default Arcade;
