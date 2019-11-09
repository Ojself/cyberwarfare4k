import React, { useState, useEffect } from "react";

const crimeResultLost = props => {
  const [crimeResultLost, setCrimeResultLost] = useState({});

  useEffect(() => {}, []);

  const giveRandomLostString = () => {
    return "You are terrible";
  };

  /* styling */
  return (
    <div>
      <span>Lost!</span>
      <span>{giveRandomLostString()}</span>
    </div>
  );
};
export default crimeResultLost;
