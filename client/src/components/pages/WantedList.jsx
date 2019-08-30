import React, { Component } from 'react';
import api from '../../api';

import { Table, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';

export default class WantedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      bountyUsers: [],
      loading: true,
      message: null
    };
    this.handleAddBounty = this.handleAddBounty.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  /* todo. make searchable form so donations can be added to new players */
  componentDidMount() {
    console.log('mounting');
    api.getWantedUsers().then(result => {
      this.setState({
        users: result.users,
        bountyUsers: result.bountyUsers,
        message: result.message,
        loading: false
      });
    });
  }

  /* todo, if bountydonors name is too many, hide em */
  /* show all bounty donors */
  /* link on names and maybe alliance */

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddBounty(e) {
    const { name } = e.target;
    const bounty = this.state[name];

    api.addBounty({ name, bounty }).then(result => {
      console.log(result, 'result');
      this.setState({
        message: 'something happend'
      });
    });
  }

  render() {
    console.log(this.state, ' state render');

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
          {this.state.bountyUsers.map(user => (
            <tr key={user._id}>
              <th scope='row'>{user.name}</th>
              <td>{user.alliance}</td>
              <td>{user.playerStats.rankName}</td>
              <td>{user.playerStats.bountyDonors[0].name}</td>
              <td>{user.playerStats.bounty}</td>
              <td>
                <InputGroup>
                  <Input
                    step={10}
                    min={0}
                    type='number'
                    name={user.name}
                    value={this.state[user.name]}
                    onChange={this.handleInputChange}
                  />
                  <InputGroupAddon addonType='append'>
                    <Button
                      name={user.name}
                      onClick={e => this.handleAddBounty(e)}
                    >
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
        {this.state.loading ? <p>a</p> : bountyUsersTable}
      </div>
    );
  }
}
