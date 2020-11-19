import React, { useState, useEffect } from "react";
import api from "../../../../api";
import CrimeTerminal from "./crimeTerminal";
import { Table, UncontrolledTooltip } from "reactstrap";

// props will be deconstr in parameters ({nameOfProp})
const HackCrimes = ({ updateGlobalValues }) => {
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
      70: "primary",
      90: "warning",
      150: "danger",
    };
    return `text-${lexi[diff]}`;
  };

  return (
    <div className="page-container">
      <h2>Hack Crimes</h2>
      <div className="d-flex mt-3 w-100 justify-content-around align-items-baseline">
        <Table className="w-50" dark striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Difficulty</th>
              <th>&#9889;5</th>
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

        <CrimeTerminal result={result} />
      </div>
    </div>
  );
};

export default HackCrimes;
