import React, { useState, useEffect } from "react";
// import api from "../../api";

const Alliance = () => {
  const [overviewState, setOverviewState] = useState({
    name: ""
  });

  useEffect(() => {
    //get Overviews
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2>Overview</h2>

      {/* Boss, CTO, analyst,lead,code monkeyadvisor, capo, capo, soldiers */}
    </div>
  );
};
export default Alliance;
