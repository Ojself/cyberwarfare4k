import React, { Component } from "react";
import Typist from "react-typist";
import { Progress } from "reactstrap";
import { randomCrimeString, errorMessages } from "./combatStrings";

export default class CrimeTerminal extends Component {
  state = {
    name: ""
  };

  giveLostString() {
    //const dotsString = ".......................................................";
    return `ERROR: ${errorMessages[this.giveRandomNumber(errorMessages)]}`;

    return randomCrimeString[this.giveRandomNumber(randomCrimeString)];
  }
  giveWonString() {
    return randomCrimeString[this.giveRandomNumber(randomCrimeString)];
  }
  giveRandomNumber(array) {
    return Math.floor(Math.random() * array.length);
  }

  checkProgressValue(n) {
    return n + 10;
  }

  render() {
    const { apiMessage, result } = this.props;

    const typistBuildUp = (
      <div>
        <Typist onTypingDone={console.log("done typing")}>
          {result
            ? result.roundResult.map((r, i) => (
                <div key={i}>
                  <Progress
                    animated
                    color="danger"
                    value={100 - result.roundCrimeRemainingHp[i]}
                  />
                  {r == "lost" ? (
                    <p>{this.giveLostString()}</p>
                  ) : (
                    <p>{this.giveWonString()}</p>
                  )}
                </div>
              ))
            : null}
        </Typist>
      </div>
    );
    return (
      <div className="crimeTerminalWrapper">
        <br />

        {apiMessage && !result ? <Typist>{apiMessage}</Typist> : null}
        {result ? typistBuildUp : null}
      </div>
    );
  }
}
/* this.state.result.roundResult.map.el(r => <p>Abcdef</p>) */
