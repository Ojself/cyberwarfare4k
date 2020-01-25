import React, { useState, useEffect } from 'react';
import api from '../../api';
import Select from 'react-select';

import {
  Button,
  Form,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  NavLink,
  Popover,
  PopoverHeader,
  PopoverBody,
  Table,
  UncontrolledPopover
} from 'reactstrap';

/* todo, make component for adding bounty number when player is selected */
/* todo, if bountydonors name is too many, hide em */
/* show all bounty donors */
/* link on names and maybe alliance */
/* Minimum of bounty should be 10000 */
/* Select module does not  overlap buttons */

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
    const massagedUser = dataMassagerForSelectComponent(apiWantedUsers.users);
    setWantedState({
      ...wantedState,
      users: massagedUser,
      bountyUsers: apiWantedUsers.bountyUsers,
      message: apiWantedUsers.message,
      loading: false
    });
  }, []);

  /* todo, this is being used many times */
  const dataMassagerForSelectComponent = userArray => {
    const massagedUsers = [];
    userArray.forEach(u => {
      massagedUsers.push({
        value: u._id,
        label: u.name
      });
    });
    return massagedUsers;
  };

  const handleInputChange = e => {
    console.log('changing', e.target.name);
    setWantedState({
      ...wantedState,
      [e.target.name]: e.target.value
    });
  };

  const addBounty = () => {
    const bounty = wantedState.bounty;
    const opponentId = selectedOption.value;
    api
      .addBounty({
        bounty,
        opponentId
      })
      .then(result => {
        console.log('jarle', result);
        const massagedUser = dataMassagerForSelectComponent(result.users);
        setWantedState({
          ...wantedState,
          users: massagedUser,
          bountyUsers: result.bountyUsers,
          message: result.message
        });
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
        <InputGroupAddon addonType='prepend'>
          <InputGroupText style={{ color: '#F08F18' }}>&#8383;</InputGroupText>
        </InputGroupAddon>
        <Input
          type='number'
          min={1000}
          step='1000'
          placeholder='Amount'
          value={wantedState.bountyInput}
          name={'bounty'}
          onChange={handleInputChange}
        />
      </InputGroup>
      <Button onClick={addBounty}>ADD</Button> {/* disabled */}
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
        {wantedState.bountyUsers.map((user, i) => (
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
            <td>
              {user.playerStats.bountyDonors.length}
              <Button id='PopoverFocus' type='button'>
                Show
              </Button>
              <UncontrolledPopover placement='right' target='PopoverFocus'>
                <PopoverHeader>Donors</PopoverHeader>
                <PopoverBody>
                  {user.playerStats.bountyDonors.map(d => (
                    <p>{d.name}</p>
                  ))}
                </PopoverBody>
              </UncontrolledPopover>
            </td>

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
    <div className='container'>
      <h3>Wanted Hackers</h3>
      {wantedState.loading ? (
        <p>loading..</p>
      ) : (
        <>
          <div> {ComponentAddUnlistedPlayer} </div>
          <div> {ComponentBountyUsersTable} </div>
        </>
      )}
    </div>
  );
};
export default WantedList;
