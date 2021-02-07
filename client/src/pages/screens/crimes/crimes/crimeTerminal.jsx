import React, { useState, useEffect } from "react";

import Typist from "react-typist";
import { Progress } from "reactstrap";
import { randomCrimeString, errorMessages } from "../../_helpers/combatStrings";

const typistQuotes = [
  {
    first: "Ready to hca ",
    count: 4,
    second: "hack",
  },
  {
    first: "sudo rm -rf .* ",
    count: 15,
    delay: 20,
    second: "Terminal up and running!",
  },
  {
    first: "$alias cd='rm -rf ",
    count: 18,
    second: "Shell standing by!",
  },
  {
    first: "Compiler rdeay",
    count: 5,
    second: "ready!",
  },
  {
    first: "Shell ready for commnads",
    count: 4,
    second: "ands!",
  },
  {
    first: "Terminal standnig by ",
    count: 7,
    second: "ing by!",
  },
  {
    first: 'Console.log(" ',
    count: 7,
    second: " is ready for pentest!",
  },
];

const CrimeTerminal = ({ result, updateGlobalUser }) => {
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

  const doneTyping = () => {
    showResults();
    decorateTerminalRed();
    updateGlobalUser();
  };

  const showResults = () => {
    setTerminalState({
      ...terminalState,
      showResults: true,
    });
  };

  const giveLostString = () => {
    return `ERROR: ${errorMessages[getRandomElementFromArray(errorMessages)]}`;
  };
  const giveWonString = () => {
    return `SUCCESS ${
      randomCrimeString[getRandomElementFromArray(randomCrimeString)]
    }`;
  };
  const getRandomElementFromArray = (array) => {
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
      <p>
        <span classname="bitcoinColor" style={{ fontSize: "1rem" }}>
          &#8383;
        </span>{" "}
        {result.playerGains.bitCoins}
      </p>
      <p>XP: {result.playerGains.exp}</p>
      {result.playerGains.levelUp && <strong>NEW RANK!</strong>}
    </div>
  );
  const decorateTerminalRed = () => {
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
    minHeight: "50vh",
  };

  const firstTypistView =
    typistQuotes[Math.floor(Math.random() * typistQuotes.length)];

  return (
    <div className="col-12">
      {!result && (
        <div style={terminalBorder} className="w-100 ">
          <div style={terminalHeader}>
            <strong>Compiling Code</strong>
          </div>
          <div className="text-left">
            <Typist
              className="pl-2 pt-2 text-left terminalFont terminalStyle"
              cursor={{ hideWhenDone: true }}
            >
              <span>{firstTypistView.first}</span>
              <Typist.Backspace
                count={firstTypistView.count}
                delay={firstTypistView.delay || 200}
              />
              <span>{firstTypistView.second}</span>
            </Typist>
          </div>
        </div>
      )}
      {result && (
        <div style={terminalBorder} className="w-100 ">
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
            onTypingDone={() => doneTyping()}
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
