import React, { useState, useEffect } from "react";
// import api from "../../api";

const Alliance = ({}) => {
  const [allianceState, setAllianceState] = useState({
    name: ""
  });

  useEffect(() => {
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2>Alliance</h2>
    </div>
  );
};
export default Alliance;
