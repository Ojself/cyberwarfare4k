import React from "react";
import { Table, UncontrolledTooltip } from "reactstrap";

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

const CrimesTable = ({ crimes, handleClick, type }) => {
  return (
    <>
      <h5>{type}</h5>
      <Table size="sm" dark>
        <thead>
          <tr>
            <th>Name</th>
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
          {crimes.map((cr, i) => {
            return (
              <tr key={cr._id}>
                <th id={`toolTip${i}`} scope="row">
                  {cr.name}
                </th>
                <UncontrolledTooltip placement="top" target={`toolTip${i}`}>
                  {cr.description}
                </UncontrolledTooltip>
                <td className={getDifficultyColor(cr.difficulty)}>
                  {cr.difficultyString}
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleClick(cr._id)}
                  >
                    Commit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default CrimesTable;
