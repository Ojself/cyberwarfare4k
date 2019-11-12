import React, { useState, useEffect } from "react";
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
        setApiMessage(result.message);
        setLoading(false);
        setCrimes(result.crimes);
        setTimeout(() => {
          setApiMessage(null);
        }, 5000);
      })
      .catch(err => console.log(err));
  }, []);

  const handleClick = async crimeId => {
    const crimeResult = await api.commitCrimes(crimeId);

    const filteredCrimes = crimes
      .filter(c => c._id !== crimeId)
      .filter(c => c.available);

    setCrimes(filteredCrimes);
    setResult(crimeResult.finalResult);

    setTimeout(() => {
      setApiMessage(null);
    }, 2000);
  };

  return (
    <div>
      <h2>Hack Crimes</h2>
      <div className="tableCrimeWrapper">
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
                    onClick={e => handleClick(cr._id)}
                  >
                    Commit
                  </button>
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
