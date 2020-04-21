import React, { useState, useEffect } from "react";
import "./pettyStyling.scss";
import {} from "@fortawesome/free-solid-svg-icons";
import { UncontrolledTooltip } from "reactstrap";
const PettyResult = (props) => {
  const {
    won,
    levelUp,
    bitCoins,
    exp,
    battery,
    stashGained,
    crimeSkillGained,
    legenedaryGained, // for later usage
  } = props.result;

  const userNames = [
    "HawkMaster",
    "odC",
    "Witzer",
    "Fenrew",
    "Darkchamp",
    "Derneld Tremfp",
    "Xaviior",
  ];

  const getStashColor = (colorDecider = 0) => {
    const defaultColors = ["red", "blue", "orange", "green"];
    return defaultColors[colorDecider % 4];
  };

  const failStrings = [
    "You failed at commiting a petty crime",
    "You found noone to attack",
    "Noone fell for your scam attempt",
  ];

  const failComponent = (
    <>
      <h6>Fail!</h6>
      <p>
        <strong>
          {failStrings[Math.floor(Math.random() * failStrings.length)]}
        </strong>
      </p>
      <p>Battery -{battery}%</p>
    </>
  );

  const winStrings = [
    "You succeeded at commiting a petty crime",
    `You scammed someone online named ${
      userNames[Math.floor(Math.random() * userNames.length)]
    }`,
    "You successfully committed an online crime",
  ];

  const winComponent = (
    <>
      <h6 id="success-color">Success!</h6>
      <div className="content">
        {stashGained ? (
          <div className="d-flex flex-column text-center">
            <img
              src={`/stashPics/${stashGained}/${getStashColor(
                props.index
              )}.png`}
              alt={stashGained}
              title={stashGained}
            />
            <p>1x</p>
          </div>
        ) : (
          <div className="placeHolder"></div>
        )}
        <div className="gains">
          <p>
            <strong>
              {winStrings[Math.floor(Math.random() * winStrings.length)]}
            </strong>
          </p>
          <p>
            + <span style={{ color: "#F08F18" }}>&#8383;</span>
            {bitCoins} bitcoins!
          </p>
          <p> + {exp} XP!</p>
          {levelUp && (
            <p>
              <strong>LEVEL UP!</strong>
            </p>
          )}
          {stashGained && <p> new stash: {stashGained}!</p>}
          {crimeSkillGained && (
            <p>
              <span style={{ color: "#28a744" }}>{crimeSkillGained}</span> skill
              gained!
            </p>
          )}
          <p>Battery: -{battery}%</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="result-wrapper">{won ? winComponent : failComponent}</div>
  );
};

export default PettyResult;
