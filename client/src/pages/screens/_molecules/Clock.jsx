import React, { useState, useEffect } from "react";

const clockSpan = {
  padding: "0.75rem",
  fontSize: "0.95rem",
};

const getCurrentTime = () => {
  const time = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Oslo",
    hour12: false,
  });
  return time.slice(11, 20);
};

const Clock = () => {
  const [timeState, setTimeState] = useState(getCurrentTime());
  useEffect(() => {
    const runner = setInterval(() => {
      setTimeState(getCurrentTime());
    }, 1000);
    return () => {
      clearInterval(runner);
    };
  }, [timeState]);
  return (
    <div className="d-inline text-light">
      <span style={clockSpan}>{timeState}</span>
      <p style={{ fontSize: "0.6rem" }} className="text-warning">
        Server time
      </p>
    </div>
  );
};
export default Clock;
