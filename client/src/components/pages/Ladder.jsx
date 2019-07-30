import React, { Component } from 'react';
import api from '../../api';

export default class Ladder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    api
      .getAllUsers()
      .then(users => {
        this.setState(users);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h2>Ladder</h2>
        <div>
          {/* Name, Kills, deaths, revenue, alliance etc */}
          {this.state.users.map((user, i) => {
            return (
              <div id={i + user} className='ladderNames'>
                <p>{user.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
