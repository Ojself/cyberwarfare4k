import React, { useState, useEffect } from "react";
import api from "../../../../api";
import CrimeTerminal from "./crimeTerminal";

import { Container, Col, Row } from "reactstrap";
import Tutorial from "../../_molecules/Tutorial";
import CrimesTable from "./CrimesTable";

import { isMobile } from "react-device-detect";

const Crimes = ({ updateGlobalValues, user }) => {
  const [result, setResult] = useState(null);
  const [crimes, setCrimes] = useState([]);
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    const fetchCrimes = async () => {
      const data = await api.getCrimes();
      updateGlobalValues(data, false);
      setCrimes(data.crimes);
    };
    fetchCrimes();
  }, []);

  const handleClick = async (crimeId) => {
    let data;
    try {
      data = await api.commitCrimes(crimeId);
    } catch (err) {
      return updateGlobalValues(err, true, true);
    }
    setCrimes(data.crimes);
    if (isMobile) {
      // Only renders a small message instead of showing terminal when mobile
      window.scrollTo({ top: 0, behavior: "smooth" });
      return updateGlobalValues(data);
    }
    setTempData(data); // Doesn't render results before crime is done
    setResult(null);
    setResult(data.finalResult);
  };

  const updateGlobalUser = () => {
    updateGlobalValues(tempData, false);
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
            updateGlobalUser={updateGlobalUser}
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
