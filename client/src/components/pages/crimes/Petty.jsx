import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import api from "../../../api";
import { randomCrimeString } from "../_helpers/combatStrings";
const PettyHack = () => {
  const [pettyState, setPettyState] = useState({
    loading: true,
    message: null,
    hacking: false,
    hackingPhrases: [], // push Typist components in here
    stopping: false,
  });

  useEffect(() => {
    insertPhrase();
    const pettyInterval = setInterval(() => {
      performHack(pettyState.hacking);
    }, 5000);
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
      }, 4500);
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
  };

  // pushes a typist component into the state
  const insertPhrase = () => {
    if (!pettyState.hacking) {
      return;
    }
    const oldArray = pettyState.hackingPhrases;
    oldArray.push(
      <Typist avgTypingDelay={40} cursor={{ show: false }}>
        {
          randomCrimeString[
            Math.floor(Math.random() * randomCrimeString.length)
          ]
        }
      </Typist>
    );
    setPettyState({
      ...pettyState,
      hackingPhrases: oldArray,
    });
  };

  // Alters between start, stop and stopping depending on current status
  const getActionButton = () => {
    let buttonDisabled = false;
    let buttonText = "Start hacking!";
    if (pettyState.hacking) {
      buttonText = "Stop!";
    }

    if (pettyState.stopping) {
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
        {getActionButton()}
        {pettyState.hackingPhrases.map((p) => {
          return p;
        })}
      </div>
    </div>
  );
};

export default PettyHack;
