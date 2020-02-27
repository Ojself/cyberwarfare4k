import React, { useState, useEffect } from "react";
import { Table, NavLink, Button } from "reactstrap";
import api from "../../../../api";
/* todo styling */
const Ladder = () => {
  const [ladderState, setLadderState] = useState({
    alliances: [],
    message: null,
    loading: true
  });

  useEffect(() => {
    getAlliances().then(result => {
      setLadderState({
        ...ladderState,
        alliances: result.totStats,
        message: result.message,
        loading: false
      });
    });
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
    totBounty: false
  });

  const toggleSort = sortName => {
    setSortState({
      ...sortState,
      [sortName]: !sortState[sortName]
    });
  };

  const getAlliances = async () => {
    const alliances = await api.getAllAlliances();
    return alliances;
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
      alliances: sortedAlliances
    });
  };

  const numberSortingMethod = query => {
    return ladderState.alliances.sort((b, a) => {
      if (sortState[query]) {
        return a[query] - b[query];
      }
      return b[query] - a[query];
    });
  };

  return (
    <div className="container mt-5">
      <h2>Alliance Ladder</h2>
      <Table striped dark className="mt-5">
        <thead>
          <tr>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "alliance")}>
              Alliance
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "members")}>
              Members
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totRank")}>
              Highest ranked
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totWealth")}>
              Wealth
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totSkills")}>
              Skills
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totAttacksInitiated")}>
              Most aggressive
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totShutdowns")}>
              Most shutdowns
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totVpnChanges")}>
              Most on the move
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totCurrencies")}>
              Most CC holders
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totCurrencyPurchases")}>
              Most CC purchases
            </th>
            <th style={{ cursor: "pointer" }} onClick={e => handleSort(e, "totBounty")}>
              Most Bounty
            </th>
          </tr>
        </thead>
        <tbody>
          {ladderState.alliances.map(alliance => (
            <tr key={alliance._id}>
              <th scope="row">
                <NavLink href={`/alliance/${alliance._id}`}>{alliance.name}</NavLink>
              </th>

              <td>{alliance.members}</td>

              <td>{getAverageScore(alliance.totRank, alliance.members)}</td>
              <td>{getAverageScore(alliance.totWealth, alliance.members)}</td>
              <td>{getAverageScore(alliance.totSkills, alliance.members)}</td>
              <td>{getAverageScore(alliance.totAttacksInitiated, alliance.members)}</td>
              <td>{getAverageScore(alliance.totShutdowns, alliance.members)}</td>
              <td>{getAverageScore(alliance.totVpnChanges, alliance.members)}</td>
              <td>{getAverageScore(alliance.totCurrencies, alliance.members)}</td>
              <td>{getAverageScore(alliance.totCurrencyPurchases, alliance.members)}</td>
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
