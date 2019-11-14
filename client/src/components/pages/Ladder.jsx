import React, { useState, useEffect } from "react";
import { Table, NavLink, Button } from "reactstrap";
import api from "../../api";

const Ladder = () => {
  const [ladderState, setLadderState] = useState({
    users: [],
    message: null,
    loading: true
  });

  useEffect(() => {
    /* add query here */
    /* random sort method on server side */

    api.getAllUsers().then(result => {
      console.log(result);
      setLadderState({
        ...ladderState,
        users: result.users,
        message: result.message,
        loading: false
      });
    });
  }, []);

  return (
    <div>
      <h2>Ladder</h2>
      <Table dark>
        <thead>
          <tr>
            <th>Hacker</th>
            <th>Alliance</th>
            <th>Rank</th>
            <th>Shutdowns</th>
            <th>Crimes</th>
            <th>Networth</th>
          </tr>
        </thead>
        <tbody>
          {ladderState.users.map((user, i) => (
            <tr key={user._id}>
              <th scope="row">
                <NavLink href={`/player/${user._id}`}>{user.name}</NavLink>
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
