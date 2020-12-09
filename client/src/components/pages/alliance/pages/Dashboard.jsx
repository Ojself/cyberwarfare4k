import React, { useState, useEffect } from "react";
// import api from "../../api";

const Dashboard = () => {
  const [dashboardState, setDashboardState] = useState({
    name: "",
  });

  useEffect(() => {
    //get Dashboards
  }, []);

  return (
    <div>
      <h1> Dashboard</h1>
      <h6>Work in progress</h6>
      <p>Here the user can invite, promotoe/demote and kick members</p>
      <p>Also Give invitation rights and forummoderator rights </p>
      <p>Also leave or dissolve alliance</p>
      {/* Select which */}
      {/* dissolve, invite, uninvite, change position, kick */}
      <button>ACTION</button>
    </div>
  );
};
export default Dashboard;
