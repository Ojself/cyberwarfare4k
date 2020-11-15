import React, { useState, useEffect } from "react";

import Typist from "react-typist";
import { Progress } from "reactstrap";

import { randomCrimeString, errorMessages } from "../../_helpers/combatStrings";

const CrimeTerminal = ({ result }) => {
  const [terminalState, setTerminalState] = useState({
    progressMaxHp: 100,
    progressCurrentHp: 0,
    round: 1,
    lostCount: 0,
  });
  useEffect(()=>{
    clearState()
  },[result])

  const clearState = ()=>{
    setTerminalState({
      progressMaxHp: 100,
      progressCurrentHp:0,
      round: 1,
      lostCount: 0
    });
  }

  const giveLostString = () => {
    return `ERROR: ${errorMessages[giveRandomNumber(errorMessages)]}`;
  };
  const giveWonString = () => {
    return `SUCCESS ${randomCrimeString[giveRandomNumber(randomCrimeString)]}`

  };
  const giveRandomNumber = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  const updateProgressBarValues = () => {
    const maxHp = result.roundCrimeRemainingHp[0] > 0 ? result.roundCrimeRemainingHp[0] : 100
    const currentHp = result.roundCrimeRemainingHp[terminalState.round + 1] > 0 ? result.roundCrimeRemainingHp[0] -
        result.roundCrimeRemainingHp[terminalState.round + 1] : 100
    setTerminalState({
      ...terminalState,
      progressMaxHp: maxHp,
      progressCurrentHp:currentHp,
      round: terminalState.round + 1,
      lostCount: result.roundResult[terminalState.round - 1] === "lost" ? (terminalState.lostCount += 1) : terminalState.lostCount
    });
  };
  return (
    <div className="crimeTerminalWrapper">
      <Progress
        animated
        color="success"
        value={terminalState.progressCurrentHp}
        max={terminalState.progressMaxHp}
        className="customProgressBar"
      />
      {result && (
        <Typist
          className="terminalFont terminalStyle"
          onLineTyped={() => {
            updateProgressBarValues();
          }}
          avgTypingDelay={10}
          cursor={{ hideWhenDone: true }}
        >
          {result.roundResult.map((r, i) => (
            <div key={i}>
              {r === "lost" ? (
                <p className="terminalLost">{giveLostString()}</p>
              ) : (
                <p className="terminalWin">{giveWonString()}</p>
              )}
            </div>
          ))}
        </Typist>
      )}
    </div>
  );
};
export default CrimeTerminal;
