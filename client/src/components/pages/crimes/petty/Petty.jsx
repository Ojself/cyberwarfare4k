import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import api from "../../../../api";
import { pettyStrings } from "../../_helpers/pettyStrings";
import PettyResult from "./pettyResult";

const PettyHack = () => {
  const [pettyState, setPettyState] = useState({
    loading: true,
    message: null,
    hacking: false,
    hackingPhrases: [], // push Typist components in here
    pettyStringProgress: 0,
    stopping: false,
    results: [],
  });

  useEffect(() => {
    insertPhrase();
    const pettyInterval = setInterval(() => {
      performHack(pettyState.hacking);
    }, 3000);
    return () => clearInterval(pettyInterval);
  }, [pettyState.hacking]);

  // toggle active hacking
  const toggleHack = () => {
    let newStopValue = false;
    // timeout to ensure 'stopping' on button while phrases are being typed
    if (pettyState.hacking) {
      newStopValue = true;
      setTimeout(() => {
        setPettyState({
          ...pettyState,
          hacking: !pettyState.hacking,
          stopping: false,
        });
      }, 3000);
    }
    setPettyState({
      ...pettyState,
      hacking: !pettyState.hacking,
      stopping: newStopValue,
    });
  };

  // calls the api
  const performHack = async (currentlyHacking) => {
    if (!currentlyHacking) {
      return;
    }
    insertPhrase();
    const result = await api.pettyHack();
    if (result.success) {
      handleSuccess(result.results);
    } /* else {
      // errormessage
    } */
  };

  // pushes result to the state
  const handleSuccess = (result) => {
    console.log(result);
    const oldResults = pettyState.results;
    oldResults.unshift(
      <PettyResult
        key={pettyState.pettyStringProgress}
        index={pettyState.pettyStringProgress}
        result={result}
      />
    );
    //oldResults.slice(0, 3);

    setPettyState({
      ...pettyState,
      results: oldResults,
    });
  };

  // pushes a typist component into the state
  const insertPhrase = () => {
    if (!pettyState.hacking) {
      return;
    }
    let randomStart;
    if (pettyState.pettyStringProgress === 0) {
      const startPoints = [1, 25, 42, 58, 73, 96, 114, 158];
      randomStart = startPoints[Math.floor(Math.random() * startPoints.length)];
      console.log(randomStart);
      setPettyState({
        ...pettyState,
        pettyStringProgress: randomStart,
      });
    }
    const oldArray = pettyState.hackingPhrases;
    oldArray.push(
      <Typist
        className="mt-5 terminal-font"
        avgTypingDelay={40}
        cursor={{ show: false }}
      >
        {
          pettyStrings[
            pettyState.pettyStringProgress === 0
              ? randomStart
              : pettyState.pettyStringProgress
          ]
        }
      </Typist>
    );
    setPettyState({
      ...pettyState,
      hackingPhrases: oldArray,
      pettyStringProgress: (pettyState.pettyStringProgress += 1),
    });
  };

  // Alters between start, stop and stopping depending on current status
  const getActionButton = (state) => {
    let buttonDisabled = false;
    let buttonText = "Start hacking!";
    if (state.hacking) {
      buttonText = "Stop!";
    }

    if (state.stopping) {
      buttonText = "Stopping..";
      buttonDisabled = true;
    }

    return (
      <button disabled={buttonDisabled} onClick={toggleHack}>
        {buttonText}
      </button>
    );
  };

  return (
    <div className="page-container">
      <h2>Petty hackr</h2>
      <div className="content">
        {getActionButton(pettyState)}
        <div className="petty-container">
          <div className="terminal">
            {/* phrases */}
            {pettyState.hackingPhrases.map((p, i) => {
              return <div key={i}>{p}</div>;
            })}
          </div>
          <div className="result-list">
             {/* results */}
            {pettyState.results.map((r, i) => {
              return r;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PettyHack;
