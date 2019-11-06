import React, { useState, useEffect } from "react";
import api from "../../api";

import { Table, InputGroup, Input, InputGroupAddon, Button } from "reactstrap";

const WantedList = () => {
  const [wantedState, setWantedState] = useState({
    users: [],
    bountyUsers: [],
    loading: true,
    message: null
  });

  useEffect(async () => {
    const apiWantedUsers = await api.getWantedUsers();
    setWantedState({
      ...wantedState,
      users: apiWantedUsers.users,
      bountyUsers: apiWantedUsers.bountyUsers,
      message: apiWantedUsers.message,
      loading: false
    });
  }, []);

  const handleInputChange = e => {
    setWantedState({
      ...wantedState,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBounty = async e => {
    const { name } = e.target;
    const bounty = wantedState[name];

    const result = await api.addBounty({ name, bounty });
    console.log(result, "result");
    setWantedState({
      ...wantedState,
      message: "something happend maybe"
    });
  };
  const addUnlistedPlayer = (
    <div>
      <h3>Add unlisted player</h3>
      <input type="text" />
    </div>
  );
  const bountyUsersTable = (
    <Table dark>
      <thead>
        <tr>
          <th>Name</th>
          <th>Alliance</th>
          <th>Rank</th>
          <th>Donors</th>
          <th>Bounty</th>
          <th>Add bounty</th>
        </tr>
      </thead>
      <tbody>
        {wantedState.bountyUsers.map(user => (
          <tr key={user._id}>
            <th scope="row">{user.name}</th>
            <td>{user.alliance}</td>
            <td>{user.playerStats.rankName}</td>
            <td>{user.playerStats.bountyDonors[0].name}</td>
            <td>{user.playerStats.bounty}</td>
            <td>
              <InputGroup>
                <Input
                  step={10}
                  min={0}
                  type="number"
                  name={user.name}
                  value={wantedState[user.name]}
                  onChange={handleInputChange}
                />
                <InputGroupAddon addonType="append">
                  <Button name={user.name} onClick={e => handleAddBounty(e)}>
                    ADD
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <h2>Datacenters</h2>
      {wantedState.loading ? <p>a</p> : bountyUsersTable}
      {addUnlistedPlayer}
    </div>
  );
};
export default WantedList;
/* todo. make searchable form so donations can be added to new players */

/* todo, if bountydonors name is too many, hide em */
/* show all bounty donors */
/* link on names and maybe alliance */
