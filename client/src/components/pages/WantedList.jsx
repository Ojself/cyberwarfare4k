import React, { useState, useEffect } from 'react';
import api from '../../api';
import Select from 'react-select';

import {
  Form,
  Table,
  InputGroup,
  Input,
  InputGroupAddon,
  Button,
  NavLink
} from 'reactstrap';

/* todo. make searchable form so donations can be added to new players */
/* todo, make component for adding bounty number when player is selected */
/* todo, if bountydonors name is too many, hide em */
/* show all bounty donors */
/* link on names and maybe alliance */

const WantedList = () => {
  const [wantedState, setWantedState] = useState({
    users: [],
    bountyUsers: [],
    loading: true,
    message: null
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const handleChange = eventValue => {
    setSelectedOption(eventValue);
  };

  useEffect(async () => {
    const apiWantedUsers = await api.getWantedUsers();
    const massagedUser = dataMassager(apiWantedUsers.users);
    setWantedState({
      ...wantedState,
      users: massagedUser,
      bountyUsers: apiWantedUsers.bountyUsers,
      message: apiWantedUsers.message,
      loading: false
    });
  }, []);

  /* todo, this is being used many times */
  const dataMassager = userArray => {
    const massagedUsers = [];
    console.log(userArray);
    userArray.forEach(u => {
      massagedUsers.push({
        value: u._id,
        label: u.name
      });
    });
    return massagedUsers;
  };

  const handleInputChange = e => {
    setWantedState({
      ...wantedState,
      [e.target.name]: e.target.value
    });
  };

  // select form
  const ComponentAddUnlistedPlayer = (
    <div>
      <h3>Add an unlisted player</h3>
      <Form>
        <Select
          className='text-dark'
          value={selectedOption}
          onChange={handleChange}
          options={wantedState.loading ? '' : wantedState.users}
        />
      </Form>
      <InputGroup>
        <InputGroupAddon addonType='prepend'>&#8383;</InputGroupAddon>
        <Input
          type='number'
          min={0}
          step='1'
          placeholder='Amount'
          value={wantedState.bountyInput}
          onChange={handleInputChange}
        />
      </InputGroup>
      <Button>ADD</Button> {/* disabled */}
    </div>
  );

  // input field for bounty on targeted user

  const ComponentBountyUsersTable = (
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
            <th scope='row'>
              <NavLink href={`/hacker/${user._id}`}>{user.name}</NavLink>
            </th>
            <td>
              <NavLink href={`/hacker/${user.alliance._id}`}>
                {user.alliance.name}
              </NavLink>
            </td>
            <td>{user.playerStats.rankName}</td>
            <td>{user.playerStats.bountyDonors.length}</td>
            <td>{user.playerStats.bounty}</td>
            <td>
              <InputGroup>
                <Input
                  step={10}
                  min={0}
                  type='number'
                  name={user.name}
                  value={wantedState[user.name]}
                  onChange={handleInputChange}
                />
                <InputGroupAddon addonType='append'>
                  <Button name={user.name}>ADD BOUNTY</Button>
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
      <h3>Wanted Hackers</h3>
      {wantedState.loading ? (
        <p>loading..</p>
      ) : (
        <>
          <div> {ComponentBountyUsersTable} </div>
          <div> {ComponentAddUnlistedPlayer} </div>
        </>
      )}
    </div>
  );
};
export default WantedList;
