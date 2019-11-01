import React, { Component, useState, useEffect } from "react";
import api from "../../api";
import CrimeTerminal from "./smaller/crimeTerminal";
import { Table, UncontrolledTooltip } from "reactstrap";

// props will be deconstr in parameters ({nameOfProp})
const HackCrimes = () => {
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState(null);
  const [result, setResult] = useState(null);
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    api
      .getCrimes()
      .then(result => {
        console.log("result", result);
        setApiMessage(result.message);
        setLoading(false);
        setCrimes(result.crimes);
        setTimeout(() => {
          setApiMessage(null);
        }, 5000);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClick = crimeId => {
    api
      .commitCrimes(crimeId)
      .then(result => {
        console.log(result, "result");
        const filteredCrimes = crimes
          .filter(c => c._id !== crimeId)
          .filter(c => c.available);

        setCrimes(filteredCrimes);
        setResult(result.finalResult);

        setTimeout(() => {
          setApiMessage(null);
        }, 2000);
      })
      .catch(err => setApiMessage(err.toString()));
  };

  return (
    <div>
      <h2>Hack Crimes</h2>
      <div className="tableCrimeWrapper">
        <Table dark striped>
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Description</th> */}
              <th>Type</th>
              <th>Difficulty</th>
              <th>Commit Crime</th>
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

                {/* <td>{cr.description}</td> */}
                <td>{cr.crimeType}</td>
                <td>{cr.difficulty}</td>
                <td>
                  <button onClick={e => handleClick(cr._id)}>Commit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <CrimeTerminal apiMessage={apiMessage} result={result} />
      </div>
    </div>
  );
};

export default HackCrimes;
