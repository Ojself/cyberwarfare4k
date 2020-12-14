import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../../../api";
/* todo styling */
const Ladder = () => {
  const [ladderState, setLadderState] = useState({
    alliances: [],
    message: null,
    loading: true,
  });

  useEffect(() => {
    const fetchAlliances = async () => {
      const data = await api.getAllianceLadder();
      setLadderState({
        ...ladderState,
        alliances: data.totStats,
        message: data.message,
        loading: false,
      });
    };
    fetchAlliances();
  }, []);

  const [sortState, setSortState] = useState({
    alliance: false,
    members: false,
    rank: false,
    totWealth: false,
    totSkills: false,
    totAttacksInitiated: false,
    totShutdowns: false,
    totVpnChanges: false,
    totCurrencies: false,
    totCurrencyPurchases: false,
    totBounty: false,
  });

  const toggleSort = (sortName) => {
    setSortState({
      ...sortState,
      [sortName]: !sortState[sortName],
    });
  };

  const handleSort = (e, sort) => {
    e.preventDefault();
    let sortedAlliances = ladderState.alliances || [];
    toggleSort(sort);
    if (sort === "alliance") {
      sortedAlliances = ladderState.alliances.sort((a, b) => {
        if (sortState.alliance) {
          return ("" + a.name).localeCompare(b.name);
        } else {
          return ("" + b.name).localeCompare(a.name);
        }
      });
    } else {
      sortedAlliances = numberSortingMethod(sort);
    }
    setLadderState({
      ...ladderState,
      alliances: sortedAlliances,
    });
  };

  const numberSortingMethod = (query) => {
    return ladderState.alliances.sort((b, a) => {
      if (sortState[query]) {
        return a[query] - b[query];
      }
      return b[query] - a[query];
    });
  };

  return (
    <div className="page-container ">
      <h1>Alliance Ladder</h1>
      <h6>Average</h6>
      <Table striped dark className="content">
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "alliance")}
            >
              Alliance
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "members")}
            >
              Members
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totRank")}
            >
              Highest ranked
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totWealth")}
            >
              Wealth
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totSkills")}
            >
              Skills
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totAttacksInitiated")}
            >
              Most aggressive
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totShutdowns")}
            >
              Most shutdowns
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totVpnChanges")}
            >
              Most on the move
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totCurrencies")}
            >
              Most CC holders
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totCurrencyPurchases")}
            >
              Most CC purchases
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totBounty")}
            >
              Most Bounty
            </th>
          </tr>
        </thead>
        <tbody>
          {ladderState.alliances.map((alliance) => (
            <tr key={alliance._id}>
              <th scope="row">
                <Link className="text-light" to={`/alliance/${alliance._id}`}>
                  {alliance.name}
                </Link>
              </th>

              <td>{alliance.members}</td>

              <td>{getAverageScore(alliance.totRank, alliance.members)}</td>
              <td>{getAverageScore(alliance.totWealth, alliance.members)}</td>
              <td>{getAverageScore(alliance.totSkills, alliance.members)}</td>
              <td>
                {getAverageScore(
                  alliance.totAttacksInitiated,
                  alliance.members
                )}
              </td>
              <td>
                {getAverageScore(alliance.totShutdowns, alliance.members)}
              </td>
              <td>
                {getAverageScore(alliance.totVpnChanges, alliance.members)}
              </td>
              <td>
                {getAverageScore(alliance.totCurrencies, alliance.members)}
              </td>
              <td>
                {getAverageScore(
                  alliance.totCurrencyPurchases,
                  alliance.members
                )}
              </td>
              <td>{getAverageScore(alliance.totBounty, alliance.members)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const getAverageScore = (x, y) => {
  const result = Math.round(x / y);
  return result ? result : 0;
};

export default Ladder;
