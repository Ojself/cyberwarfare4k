import React from "react";
import "./pettyStyling.scss";

const PettyResult = (props) => {
  const {
    won,
    levelUp,
    bitCoins,
    exp,
    battery,
    stashGained,
    skillGained,
  } = props.result;

  

  const getSkillColor = (skill)=> {
    if (["CPU", "Encryption", "AntiVirus"].includes( skill)){
      return 'primary'
    }
    return 'success'
  }

  const getStashColor = (colorDecider = 0) => {
    const defaultColors = ["red", "blue", "orange", "green"];
    return defaultColors[colorDecider % 4];
  };

  const failStrings = [
    "You failed at commiting a petty crime",
    "Your attack was unsuccessful",
    "You found noone to attack",
    "Your computer malfunctioned",
    "Noone fell for your scam attempt",
  ];

  const failComponent = (
    <>
      <h6 id="fail-color">Fail!</h6>
      <p>
        <strong>{failStrings[props.index % failStrings.length]}</strong>
      </p>
      <p>
        <span role="img" aria-label="battery">
          &#9889;
        </span>{" "}
        -{battery}%
      </p>
    </>
  );

  const winStrings = [
    "You succeeded at commiting a petty crime",
    "You scammed someone online",
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
            <strong>{winStrings[props.index % winStrings.length]}</strong>
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
          {skillGained && (
            <p>
              <span className={`text-${getSkillColor(skillGained)}`}>{skillGained}</span> skill
              gained!
            </p>
          )}
          <p>
            {" "}
            <span role="img" aria-label="battery">
              &#9889;
            </span>
            -{battery}%
          </p>
        </div>
      </div>
    </>
  );

  return (
    <div className="result-wrapper">{won ? winComponent : failComponent}</div>
  );
};

export default PettyResult;
