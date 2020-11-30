import React, { useState, useEffect } from "react";

const crimeResultLost = () => {
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
