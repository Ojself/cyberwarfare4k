import React, { useState, useEffect } from "react";

import Typist from "react-typist";
import { Progress } from "reactstrap";

import { randomCrimeString, errorMessages } from "../_helpers/combatStrings";

const AttackTerminal = ({ message, result }) => {
  const [terminalState, setTerminalState] = useState({
    showResults: false,
    progressValue: 0,
    round: 0,
    decorationColor: "#08fe00",
    progressBarColor: "success"
  });
  useEffect(() => {
    clearState();
  }, [result]);

  const clearState = () => {
    setTerminalState({
      showResults: false,
      progressValue: 0,
      round: 0,
      decorationColor: "#08fe00",
      progressBarColor: "success",
    });
  };

  const showResults = () => {
    setTerminalState({
      ...terminalState,
      showResults: true,
    });
    setDecorationToDanger();
  };

  const giveResultString = (status)=>{
      let result;
      console.log(status, 'giveResultString');
      if (status === 'lost') result = giveLostString()
      if (status === 'win') result = giveWonString()
      if (status === "blocked") result = giveBlockedString();

      return <p className={`pl-2 terminalText${status}`}>{result}</p>;
  }

  const giveLostString = () => {
    return `ERROR: ${errorMessages[getRandomNumber(errorMessages)]}`;
  };
  const giveBlockedString = () => {
    return `ENCRYPTED .......................... `;
  };
  const giveWonString = () => {
    return `SUCCESS ${randomCrimeString[getRandomNumber(randomCrimeString)]}`;
  };
  const getRandomNumber = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  const updateProgressBarValues = () => {
      let currentProgress = terminalState.progressValue
      const status = result.roundResult[terminalState.round];
      console.log(result.roundResult.length, terminalState.round + 1);
      if (status === 'win'){
          currentProgress += Math.floor(Math.random() * (25 - 10) + 25);
          if (result.roundResult.length <= (terminalState.round + 1)){
              currentProgress = 100
          }
      }
    setTerminalState({
      ...terminalState,
      round: terminalState.round + 1,
      progressValue: currentProgress,
    });
  };
  const resultsOverview = result && (
    <div
      className={`w-100 my-2 text-${
        result.won ? "warning" : "danger"
      } AttackTerminalResultWrapper`}
    >
      {message}
    </div>
  );
  const setDecorationToDanger = () => {
    if (result.won) return;
    setTerminalState({
      ...terminalState,
      decorationColor: "#ab0000",
      progressBarColor: "danger",
    });
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
    <div className="w-100 mt-2">
      {result && (
        <div style={terminalBorder} className="w-100">
          <div style={terminalHeader}>
            <strong>Compiling Code</strong>
          </div>
          <Progress animated color={terminalState.progressBarColor} value={terminalState.progressValue} max={100} />
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
              <div key={i}>{giveResultString(r)}</div>
            ))}
          </Typist>
        </div>
      )}
    </div>
  );
};
export default AttackTerminal;
