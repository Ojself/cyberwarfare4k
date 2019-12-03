import React, { useState, useEffect } from "react";
// import api from "../../api";

const Alliance = () => {
  const [allianceState, setAllianceState] = useState({
    name: ""
  });

  useEffect(() => {
    //get alliances
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2>Create Alliance</h2>

      {/* Select which */}
      <button>Create</button>
    </div>
  );
};
export default Alliance;
