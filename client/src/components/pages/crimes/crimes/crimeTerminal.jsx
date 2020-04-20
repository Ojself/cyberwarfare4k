import React, { useState, useEffect } from "react";

import Typist from "react-typist";
import { Progress } from "reactstrap";

import { randomCrimeString, errorMessages } from "../../_helpers/combatStrings";

const CrimeTerminal = ({ apiMessage, result }) => {
  const [terminalState, setTerminalState] = useState({
    progressMaxHp: 100,
    progressCurrentHp: 0,
    progressColor: "success",
    defaultColors: ["success", "success", "info", "warning", "danger"],
    index: 1,
    lostCount: 0,
  });

  useEffect(() => {}, []);

  const giveLostString = () => {
    //const dotsString = ".......................................................";

    return `ERROR: ${errorMessages[giveRandomNumber(errorMessages)]}`;
  };
  const giveWonString = () => {
    /* if already won, don't give empty span */
    /* return randomCrimeString[giveRandomNumber(randomCrimeString)]; */
    return (
      <span className="terminalFont terminalLost">{giveLostString()}</span>
    );
  };
  const giveRandomNumber = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  const createSuccessString = () => {
    return "Successstring";
  };

  const updateProgressBarValues = () => {
    console.log(result.roundResult[terminalState.index - 1]);
    if (result.roundResult[terminalState.index - 1] === "lost") {
      changeProgressColor();
    }

    setTerminalState({
      ...terminalState,
      progressMaxHp: result.roundCrimeRemainingHp[0],
      progressCurrentHp:
        result.roundCrimeRemainingHp[0] -
        result.roundCrimeRemainingHp[terminalState.index + 1],
      index: (terminalState.index += 1),
    });
  };

  const changeProgressColor = () => {
    console.log(terminalState.progressColor[terminalState.lostCount]);
    setTerminalState({
      ...terminalState,
      progressColor: terminalState.defaultColors[terminalState.lostCount],
      lostCount: (terminalState.lostCount += 1),
    });
  };

  return (
    <div className="crimeTerminalWrapper">
      <Progress
        animated
        color={terminalState.defaultColors[terminalState.lostCount]}
        value={terminalState.progressCurrentHp}
        max={terminalState.progressMaxHp}
        className="customProgressBar"
      />
      {/* message from server. eg: Crimes loaded.. disappears after 4 seconds */}
      {apiMessage && !result && (
        <Typist className=" terminalFont" cursor={{ hideWhenDone: false }}>
          <span> {apiMessage} </span>
        </Typist>
      )}
      {result && (
        <Typist
          className="terminalFont"
          onLineTyped={() => {
            updateProgressBarValues();
          }}
          avgTypingDelay={10}
          cursor={{ hideWhenDone: true }}
        >
          {result.roundResult.map((r, i) => (
            <div key={i}>
              {r === "lost" ? (
                <span className="terminalLost">{giveLostString()}</span>
              ) : (
                <span className="terminalWin">{giveWonString()}</span>
              )}
            </div>
          ))}
        </Typist>
      )}
    </div>
  );
};
export default CrimeTerminal;
