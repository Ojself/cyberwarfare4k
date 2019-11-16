import React, { useState, useEffect } from "react";
import { Table, NavLink, Button } from "reactstrap";
import api from "../../api";

const Ladder = props => {
  const [ladderState, setLadderState] = useState({
    users: [],
    message: null,
    loading: true
  });

  useEffect(() => {
    getUsers().then(result => {
      setLadderState({
        ...ladderState,
        users: result.users,
        message: result.message,
        loading: false
      });
    });
  }, []);

  const getUsers = async () => {
    const users = await api.getAllUsers();
    return users;
  };

  const handleSort = (e, sort) => {
    e.preventDefault();
    let sortedUsers = ladderState.users || [];

    switch (sort) {
      case "hacker":
        sortedUsers = ladderState.users.sort((a, b) =>
          ("" + a.name).localeCompare(b.name)
        );
        break;
      case "alliance":
        sortedUsers = ladderState.users.sort((a, b) =>
          ("" + a.alliance.name).localeCompare(b.alliance.name)
        );
        break;
      case "rank":
        sortedUsers = ladderState.users.sort(
          (b, a) => a.playerStats.rank - b.playerStats.rank
        );
        break;
      case "shutdowns":
        sortedUsers = ladderState.users.sort(
          (b, a) => a.fightInformation.shutdowns - b.fightInformation.shutdowns
        );
        break;
      case "crimes":
        sortedUsers = ladderState.users.sort(
          (b, a) =>
            a.fightInformation.crimesInitiated -
            b.fightInformation.crimesInitiated
        );
        break;
      case "networth":
        sortedUsers = ladderState.users.sort(
          (b, a) => a.playerStats.networth - b.playerStats.networth
        );
        break;
    }

    setLadderState({
      ...ladderState,
      users: sortedUsers
    });
  };

  return (
    <div>
      <h2>Ladder</h2>
      <Table striped dark>
        <thead>
          <tr>
            <th onClick={e => handleSort(e, "hacker")}>Hacker</th>
            <th onClick={e => handleSort(e, "alliance")}>Alliance</th>
            <th onClick={e => handleSort(e, "rank")}>Rank</th>
            <th onClick={e => handleSort(e, "shutdowns")}>Shutdowns</th>
            <th onClick={e => handleSort(e, "crimes")}>Crimes</th>
            <th onClick={e => handleSort(e, "networth")}>Networth</th>
          </tr>
        </thead>
        <tbody>
          {ladderState.users.map((user, i) => (
            <tr key={user._id}>
              <th scope="row">
                <NavLink href={`/hacker/${user._id}`}>{user.name}</NavLink>
              </th>
              <td>
                {user.alliance ? (
                  <NavLink href={`/alliance/${user.alliance._id}`}>
                    {user.alliance.name}
                  </NavLink>
                ) : (
                  "none"
                )}
              </td>
              <td>{user.playerStats.rankName}</td>
              <td>{user.fightInformation.shutdowns}</td>
              <td>{user.fightInformation.crimesInitiated}</td>
              <td>{user.playerStats.networth}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Ladder;
