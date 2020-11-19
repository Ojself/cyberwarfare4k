import React, { useState, useEffect } from "react";

import Typist from "react-typist";
import { Progress } from "reactstrap";

import { randomCrimeString, errorMessages } from "../../_helpers/combatStrings";

const CrimeTerminal = ({ result }) => {
  const [terminalState, setTerminalState] = useState({
    showResults: false,
    progressMaxHp: 100,
    progressCurrentHp: 0,
    round: 1,
    lostCount: 0,
  });
  useEffect(() => {
    clearState();
  }, [result]);

  const clearState = () => {
    setTerminalState({
      showResults: false,
      progressMaxHp: 100,
      progressCurrentHp: 0,
      round: 1,
      lostCount: 0,
    });
  };

  const showResults = () => {
    setTerminalState({
      ...terminalState,
      showResults: true,
    });
  };

  const giveLostString = () => {
    return `ERROR: ${errorMessages[getRandomNumber(errorMessages)]}`;
  };
  const giveWonString = () => {
    return `SUCCESS ${randomCrimeString[getRandomNumber(randomCrimeString)]}`;
  };
  const getRandomNumber = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  const updateProgressBarValues = () => {
    const maxHp = result.roundCrimeRemainingHp[0];
    const currentHp =
      result.roundCrimeRemainingHp[0] -
      result.roundCrimeRemainingHp[terminalState.round];
    setTerminalState({
      ...terminalState,
      progressMaxHp: maxHp,
      progressCurrentHp: currentHp,
      round: terminalState.round + 1,
      lostCount:
        result.roundResult[terminalState.round - 1] === "lost"
          ? (terminalState.lostCount += 1)
          : terminalState.lostCount,
    });
  };
  console.log(result ? result.playerGains : null);
  const resultsOverview = result && (
    <div
      className={`text-${
        result.won ? "warning" : "danger"
      } text-left w-50 pl-2`}
    >
      <h6>Results</h6>
      <p>bitcoins: {result.playerGains.bitCoins}</p>
      <p>exp: {result.playerGains.exp}</p>
      {result.playerGains.levelUp && <strong>NEW RANK!</strong>}
      {/* <p>skill: {result.playerGains.skillGained}</p>
      <p>stashGained: {result.playerGains.skillGained}</p> */}
    </div>
  );
  return (
    <div className="col-5 mt-3">
      {result && (
        <div className="crimeTerminalWrapper w-100">
          <Progress
            animated
            color="success"
            value={terminalState.progressCurrentHp}
            max={terminalState.progressMaxHp}
            style={{ margin: "20px" }}
          />
          {terminalState.showResults && resultsOverview}
          <Typist
            className="terminalFont terminalStyle"
            onLineTyped={() => {
              updateProgressBarValues();
            }}
            onTypingDone={() => showResults()}
            avgTypingDelay={10}
            cursor={{ hideWhenDone: true }}
          >
            {result.roundResult.map((r, i) => (
              <div key={i}>
                {r === "lost" ? (
                  <p className="pl-2 terminalTextLost">{giveLostString()}</p>
                ) : (
                  <p className="pl-2 terminalTextGreen">{giveWonString()}</p>
                )}
              </div>
            ))}
          </Typist>
        </div>
      )}
    </div>
  );
};
export default CrimeTerminal;
