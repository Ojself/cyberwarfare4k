import React, { useState, useEffect } from "react";
import Typist from "react-typist";
import api from "../../../../api";
import { pettyStrings } from "../../_helpers/pettyStrings";
import PettyResult from "./pettyResult";
import { Button, Container, Col, Row } from "reactstrap";

import Tutorial from "../../_molecules/Tutorial";

const PettyHack = ({ user, globalLoading, updateGlobalValues }) => {
  const [pettyState, setPettyState] = useState({
    hacking: false,
    hackingPhrases: [], // push Typist components in here
    pettyStringProgress: 0,
    stopping: false,
    results: [],
  });

  useEffect(() => {
    insertNewPhrase();
    const pettyInterval = setInterval(() => {
      performHack(pettyState.hacking);
    }, 3000);
    return () => clearInterval(pettyInterval);
  }, [pettyState.hacking]);

  // toggle active hacking
  const toggleHack = () => {
    let shouldStop = false;
    // timeout to ensure 'stopping' on button while phrases are being typed
    if (pettyState.hacking) {
      shouldStop = true;
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
      stopping: shouldStop,
    });
  };

  // calls the api
  const performHack = async (currentlyHacking) => {
    if (!currentlyHacking) {
      return;
    }
    insertNewPhrase();
    let data;
    try {
      data = await api.pettyHack();
    } catch (err) {
      setPettyState({
        ...pettyState,
        hacking: false,
      });
      console.error(err, "err");
      return updateGlobalValues(err, true, true);
    }
    updateGlobalValues(data, false);
    if (data.success) {
      handleSuccess(data.results);
    }
  };

  // pushes result to the state
  const handleSuccess = (result) => {
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
  const insertNewPhrase = () => {
    if (!pettyState.hacking) {
      return;
    }
    let randomStart;
    if (pettyState.pettyStringProgress === 0) {
      const startPoints = [1, 25, 42, 58, 73, 96, 114, 158];
      randomStart = startPoints[Math.floor(Math.random() * startPoints.length)];
      setPettyState({
        ...pettyState,
        pettyStringProgress: randomStart,
      });
    }
    const oldArray = pettyState.hackingPhrases;

    oldArray.push(
      <Typist
        className="mt-3 terminal-font"
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
    let buttonText = (
      <>
        Start hacking!
        <span role="img" aria-label="battery">
          &#9889;
        </span>
        1
      </>
    ); ;

    if (state.hacking) {
      buttonText = "Stop!";
    }

    if (state.stopping) {
      buttonText = "Stopping..";
      buttonDisabled = true;
    }

    if (globalLoading || user.playerStats.battery <= 0) {
      buttonDisabled = true;
    }

    return (
      <Button
        style={{ minWidth: "15%" }}
        className={"btn-outline-danger"}
        color={"outline-danger"}
        disabled={buttonDisabled}
        onClick={toggleHack}
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <div className="petty-page-container">
      <div className="d-flex justify-content-center">
        <h1>Petty hackr</h1>
        <Tutorial size={"md"} section="Petty" />
      </div>

      <div className="content">
        {getActionButton(pettyState)}
        <div className="d-flex w-100 mt-3">
          {/* phrases */}
          <Container>
            <Row>
              <Col className="display-none-when-mobile" md="6">
                {pettyState.hackingPhrases.map((p, i) => (
                  <div key={`${p}${i}`}>{p}</div>
                ))}
              </Col>
              <Col sm="12" md="6">
                {pettyState.results.map((r) => r)}
              </Col>
            </Row>
          </Container>
        </div>
        {/* <div className="result-list"></div> */}
      </div>
    </div>
  );
};

export default PettyHack;
