import React, { useEffect } from "react";
// import api from "../../api";

const Notification = () => {
  useEffect(() => {
    console.log("using effect");
  }, []);

  return (
    <div className="page-container">
      <h2>Notification</h2>
      <div className="content">
        <h6>Content</h6>
      </div>
    </div>
  );
};
export default Notification;
