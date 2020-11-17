import React, { useState, useEffect } from "react";
import api from "../../../../api";
import CrimeTerminal from "./crimeTerminal";
import { Table, UncontrolledTooltip } from "reactstrap";

// props will be deconstr in parameters ({nameOfProp})
const HackCrimes = ({updateGlobalValues}) => {

  const [result, setResult] = useState(null);
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async ()=>{
      const result = await api.getCrimes()
      updateGlobalValues(result)
      setCrimes(result.crimes);
    }
    fetchCrimes()
  }, []);

  const handleClick = async (crimeId) => {
    setResult(null)
    const crimeResult = await api.commitCrimes(crimeId);
    console.log(crimeResult,'crimeResult')
    updateGlobalValues(crimeResult,false)

    const filteredCrimes = crimes
      .filter((c) => c._id !== crimeId)
      .filter((c) => c.available);
    setCrimes(filteredCrimes);
    setResult(crimeResult.finalResult);
  };

  return (
    <div className="page-container">
      <h2>Hack Crimes</h2>
      <div className="content d-flex">
        <Table dark striped>
          <thead>
            <tr>
              <th>Name</th>
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
                <td>{cr.crimeType}</td>
                <td>{cr.difficulty}</td>
                {/* cr.difficultyString */}
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
        <CrimeTerminal result={result} />
      </div>
    </div>
  );
};

export default HackCrimes;
