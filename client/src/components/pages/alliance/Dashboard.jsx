import React, { useState, useEffect } from "react";
// import api from "../../api";

const Dashboard = () => {
  const [dashboardState, setDashboardState] = useState({
    name: ""
  });

  useEffect(() => {
    //get Dashboards
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2> Dashboard</h2>

      {/* Select which */}
      {/* dissolve, invite, uninvite, change position, kick */}
      <button>ACTION</button>
    </div>
  );
};
export default Dashboard;
