import React, { useState, useEffect } from "react";
import api from "../../../../api";
import CrimeTerminal from "./crimeTerminal";

import { Table, UncontrolledTooltip, Container, Col, Row } from "reactstrap";

// props will be deconstr in parameters ({nameOfProp})
const HackCrimes = ({ updateGlobalValues, user }) => {
  const [result, setResult] = useState(null);
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      const data = await api.getCrimes();
      updateGlobalValues(data);
      setCrimes(data.crimes);
    };
    fetchCrimes();
  }, []);

  const handleClick = async (crimeId) => {
    setResult(null);
    let data;

    try {
      data = await api.commitCrimes(crimeId);
    } catch (err) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return updateGlobalValues(err);
    }
    updateGlobalValues(data, false);
    setCrimes(data.crimes);
    setResult(data.finalResult);
  };

  const getDifficultyColor = (diff) => {
    const lexi = {
      30: "success",
      50: "info",
      70: "light",
      90: "warning",
      150: "danger",
    };
    return `text-${lexi[diff]}`;
  };

  return (
    <div className="crimes-page-container">
      <h1>Hack Crimes</h1>
      <Container className="mt-2">
        <Row sm="1" md="2">
          <Col sm="12" md="7">
            <Table dark striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Difficulty</th>
                  <th>
                    <span role="img" aria-label="battery">
                      &#9889;
                    </span>
                    5
                  </th>
                </tr>
              </thead>
              <tbody>
                {crimes.map((cr, i) => (
                  <tr key={i}>
                    <th id={`toolTip${i}`} scope="row">
                      {cr.name}
                    </th>
                    <UncontrolledTooltip placement="top" target={`toolTip${i}`}>
                      {cr.description}
                    </UncontrolledTooltip>
                    <td>{cr.crimeType}</td>
                    <td className={getDifficultyColor(cr.difficulty)}>
                      {cr.difficultyString}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={(e) => handleClick(cr._id)}
                      >
                        Commit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col className="display-none-when-mobile" md="5">
            <CrimeTerminal
              updateGlobalValues={updateGlobalValues}
              user={user}
              result={result}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HackCrimes;
