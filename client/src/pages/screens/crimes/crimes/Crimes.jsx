import React, { useState, useEffect } from "react";
import api from "../../../../api";
import CrimeTerminal from "./crimeTerminal";

import { Container, Col, Row } from "reactstrap";
import Tutorial from "../../_molecules/Tutorial";
import CrimesTable from "./CrimesTable";

const Crimes = ({ updateGlobalValues, user }) => {
  const [result, setResult] = useState(null);
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      const data = await api.getCrimes();
      console.log(data);
      updateGlobalValues(data, false);
      setCrimes(data.crimes);
    };
    fetchCrimes();
  }, []);

  const handleClick = async (crimeId) => {
    setResult(null);
    let data;

    try {
      data = await api.commitCrimes(crimeId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      return updateGlobalValues(err, true, true);
    }
    updateGlobalValues(data, false);
    setCrimes(data.crimes);
    setResult(data.finalResult);
  };

  return (
    <Container fluid className="w-100 ">
      <Row>
        <Col className="d-flex justify-content-center">
          <h1>Hack Crimes</h1>
          <Tutorial size={"md"} section="Crimes" />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm="12" md="4">
          <CrimesTable
            crimes={crimes.filter(
              (crime) => crime.crimeType === "Cryptography"
            )}
            type="Cryptography"
            handleClick={handleClick}
          />

          <CrimesTable
            crimes={crimes.filter((crime) => crime.crimeType === "Forensics")}
            type="Forensics"
            handleClick={handleClick}
          />
        </Col>

        <Col className="display-none-when-mobile" md="4">
          <CrimeTerminal
            updateGlobalValues={updateGlobalValues}
            user={user}
            result={result}
          />
        </Col>

        <Col sm="12" md="4">
          <CrimesTable
            crimes={crimes.filter(
              (crime) => crime.crimeType === "Social Engineering"
            )}
            type="Social Engineering"
            handleClick={handleClick}
          />

          <CrimesTable
            crimes={crimes.filter((crime) => crime.crimeType === "Technical")}
            type="Technical"
            handleClick={handleClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Crimes;
