import React, { useState, useEffect } from "react";
// import api from "../../api";

const Notification = () => {
  const [notificationState, setNotificationState] = useState({
    name: ""
  });

  useEffect(() => {
    console.log("using effect");
  }, []);

  return (
    <div>
      <h2>Notification</h2>
    </div>
  );
};
export default Notification;
