import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import api from "../../api";
import { Link } from "react-router-dom";

/* Todo
styling
Math.flooring values
slicing out user array in server side so there's not too many users?
*/

const Ladder = () => {
  const [ladderState, setLadderState] = useState({
    users: [],
    message: null,
    loading: true,
  });
  const [sortState, setSortState] = useState({
    hacker: false,
    alliance: false,
    rank: false,
    shutdowns: false,
    crimesInitiated: false,
    networth: false,
  });

  const toggleSort = (sortName) => {
    setSortState({
      ...sortState,
      [sortName]: !sortState[sortName],
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await api.getAllLadderUsers();
      setLadderState({
        ...ladderState,
        users: users.users,
        message: users.message,
        loading: false,
      });
    };
    fetchUsers();
  }, []);

  const handleSort = (e, sort) => {
    sort = sort.toLowerCase();
    e.preventDefault();
    let sortedUsers = ladderState.users || [];

    switch (sort) {
      case "hacker":
        toggleSort("hacker");
        sortedUsers = ladderState.users.sort((a, b) => {
          if (sortState.hacker) {
            return ("" + a.name).localeCompare(b.name);
          }
          return ("" + b.name).localeCompare(a.name);
        });
        break;
      case "alliance":
        toggleSort("alliance"); // yikes
        sortedUsers = ladderState.users.sort((a, b) => {
          if (!a.alliance || !a.alliance.name) {
            a = { alliance: { name: "" } };
          }
          if (!b.alliance || !b.alliance.name) {
            b = { alliance: { name: "" } };
          }
          if (sortState.alliance) {
            return ("" + a.alliance.name).localeCompare(b.alliance.name);
          }
          return ("" + b.alliance.name).localeCompare(a.alliance.name);
        });
        break;
      case "rank":
        toggleSort("rank");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.rank) {
            return a.playerStats.rank - b.playerStats.rank;
          }
          return b.playerStats.rank - a.playerStats.rank;
        });
        break;
      case "shutdowns":
        toggleSort("shutdowns");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.shutdowns) {
            return a.fightInformation.shutdowns - b.fightInformation.shutdowns;
          }
          return b.fightInformation.shutdowns - a.fightInformation.shutdowns;
        });
        break;
      case "crimes":
        toggleSort("crimes");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.crimes) {
            return (
              a.fightInformation.crimesInitiated -
              b.fightInformation.crimesInitiated
            );
          }
          return (
            b.fightInformation.crimesInitiated -
            a.fightInformation.crimesInitiated
          );
        });
        break;
      case "networth":
        toggleSort("networth");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.networth) {
            return a.playerStats.networth - b.playerStats.networth;
          }
          return b.playerStats.networth - a.playerStats.networth;
        });
        break;
      default:
        toggleSort("networth");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.networth) {
            return a.playerStats.networth - b.playerStats.networth;
          }
          return b.playerStats.networth - a.playerStats.networth;
        });
        break;
    }

    setLadderState({
      ...ladderState,
      users: sortedUsers,
    });
  };

  return (
    <div className="page-container">
      <h1 className="display-3">Ladder</h1>
      <Table className="content " striped dark>
        <thead>
          <tr>
            {[
              "Hacker",
              "Alliance",
              "Rank",
              "Shutdowns",
              "Crimes",
              "Networth",
            ].map((s, i) => {
              return (
                <th
                  key={i}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleSort(e, s)}
                >
                  {s}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ladderState.users.map((user) => (
            <tr key={user._id}>
              <th scope="row">
                <Link className="text-light" to={`/hacker/${user._id}`}>
                  {user.name}
                </Link>
              </th>
              <td>
                {user.alliance ? (
                  <Link
                    className="text-light"
                    to={`/alliance/${user.alliance._id}`}
                  >
                    {user.alliance.name}
                  </Link>
                ) : (
                  "-"
                )}
              </td>
              <td>{user.playerStats.rankName}</td>
              <td>{user.fightInformation.shutdowns}</td>
              <td>{user.fightInformation.crimesInitiated}</td>
              <td>
                {user.playerStats.networth.toLocaleString()}
                <span style={{ color: "#F08F18" }}>&#8383;</span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Ladder;
