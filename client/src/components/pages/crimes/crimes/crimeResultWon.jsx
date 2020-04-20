import React, { useState, useEffect } from "react";

const crimeResultWon = (props) => {
  const levelUpTag /* random strings? */ = (
    <div>
      <span>You gained a new level!</span>
      <span>You have new statpoints to spend!</span>
    </div>
  );

  const skillGainedTag /* random strings? */ = (
    <div>
      <span>You gained a new skill!</span>
      <span>{props.result.skillGained}!</span>
    </div>
  );

  const stashGainedTag /* random strings? */ = (
    <div>
      <span>You gained a new skill!</span>
      <span>{props.result.stashGained}!</span>
    </div>
  );

  const legendaryGainedTag /* random strings? */ = (
    <div>
      <span>You gained a legendary item!</span>
      <span>{props.result.legendaryGained}!</span>
    </div>
  );
  /* styling */
  return (
    <div>
      <span>SUCCESS!</span>
      {props.result.levelUp && levelUpTag}
      {props.result.skillGained && skillGainedTag}
      {props.result.legendaryGained && legendaryGainedTag}
      {props.result.stashGained && stashGainedTag}
      <span>Bitcoins stolen: {props.result.playerGains.bitcoins}</span>
      <span>EXP gained: {props.result.playerGains.exp}</span>
    </div>
  );
};
export default crimeResultWon;
