import React, { useState, useEffect } from "react";
// import api from "../../api";

const CreateAlliance = () => {
  const [createAllianceState, setCreateAllianceState] = useState({
    name: ""
  });

  useEffect(() => {
    //get CreateAlliances
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2>Create CreateAlliance</h2>

      {/* Select which */}
      <button>Create</button>
    </div>
  );
};
export default CreateAlliance;
