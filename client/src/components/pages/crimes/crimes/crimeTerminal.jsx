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
    progressBarColor: "success",
    decorationColor: "#08fe00",
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
      progressBarColor: "success",
      decorationColor: "#08fe00",
    });
  };

  const showResults = () => {
    setTerminalState({
      ...terminalState,
      showResults: true,
    });
    blinkDecorationColor();
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
  const resultsOverview = result && (
    <div
      className={`text-${
        result.won ? "warning" : "danger"
      } crimeTerminalResultWrapper`}
    >
      <h5>Results</h5>
      <p>
        <span style={{ fontSize: "1rem", color: "#F08F18" }}>&#8383;</span>{" "}
        {result.playerGains.bitCoins}
      </p>
      <p>XP: {result.playerGains.exp}</p>
      {result.playerGains.levelUp && <strong>NEW RANK!</strong>}
      {/* <p>skill: {result.playerGains.skillGained}</p>
      <p>stashGained: {result.playerGains.skillGained}</p> */}
    </div>
  );
  const blinkDecorationColor = () => {
    if (result.won) return;
    setTerminalState({
      ...terminalState,
      decorationColor: "#ab0000",
      progressBarColor: "danger",
    });
    /* This will blink it. Current behaviour is perma red terminal header */
    /* setTimeout(() => {
      setTerminalState({
        ...terminalState,
        decorationColor: "#08fe00",
      });
    }, 350); */
  };

  const terminalHeader = {
    color: "black",
    backgroundColor: terminalState.decorationColor,
  };
  const terminalBorder = {
    borderLeft: `1px solid ${terminalState.decorationColor}`,
    borderRight: `1px solid ${terminalState.decorationColor}`,
    borderBottom: `3px solid ${terminalState.decorationColor}`,
  };

  return (
    <div className="col-5">
      {result && (
        <div style={terminalBorder} className="w-100">
          <div style={terminalHeader}>
            <strong>Compiling Code</strong>
          </div>
          <Progress
            animated
            color={terminalState.progressBarColor}
            value={terminalState.progressCurrentHp}
            max={terminalState.progressMaxHp}
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
                  <p className="pl-2 terminalTextlost">{giveLostString()}</p>
                ) : (
                  <p className="pl-2 terminalTextwin">{giveWonString()}</p>
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
