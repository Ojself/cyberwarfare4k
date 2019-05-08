import React, { Component } from 'react';
import api from '../../api';
/* NOTE: */
/* Too much information is being sent from the backend, no need for pw, timestamps, etc */
/* Not mobile friendly */
/* BTC symbol instead of dollar symbol */
/* Formating start date */
/* Table for items */
/* Something weird with the items. Check schematype */
/* Format the tables */
/* + Button needs to be an actuall button that does an API call */
export default class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    api
      .getUser()
      .then(user => {
        this.setState(user);
      })
      .catch(err => console.log(err));
  }

  handleUpgrade(e) {
    console.log('upgrading:', e.target.name);
    /* api call here */
  }

  render() {
    console.log(this.state, 'state');
    return (
      <div>
        <h2>My profile</h2>

        {/* Bootstrap table */}
        {/* 1st table */}
        <table className='table table-sm table-dark'>
          <thead>
            <tr>
              <th scope='col'>STATUS:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>Name:</th>
              <td>{this.state.username}</td>
            </tr>
            <tr>
              <th scope='row'>Alliance:</th>
              <td>{this.state.alliance}</td>
            </tr>
            <tr>
              <th scope='row'>Rank:</th>
              <td>{this.state.rankName}</td>
            </tr>
            <tr>
              <th scope='row'>Networth:</th>
              <td>{this.state.networth}$</td>
            </tr>
            <tr>
              <th scope='row'>Start date:</th>
              <td>{this.state.createdAt}</td>
            </tr>
          </tbody>
        </table>
        {/* 2nd table */}
        <table className='table table-sm table-dark'>
          <thead>
            <tr>
              <th scope='col'>HACK STATS:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>EXP:</th>
              <td>{this.state.exp}</td>
            </tr>
            <tr>
              <th scope='row'>EXP to new rank:</th>
              <td>{this.state.expToLevel}</td>
            </tr>
            <tr>
              <th scope='row'>Shutdowns:</th>
              <td>{this.state.rankName}</td>
            </tr>
            <tr>
              <th scope='row'>Crime Skill:</th>
              <td>{this.state.crimeSkill}</td>
            </tr>
          </tbody>
        </table>
        {/* 3rd table */}
        <table className='table table-sm table-dark'>
          <thead>
            <tr>
              <th scope='col'>HACK SKILLS:</th>
              <th scope='col'>VALUE:</th>
              <th scope='col'>UPGRADE:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>Firewall:</th>
              <td>{this.state.maxFirewall}</td>
              <td>
                <button name='maxFirewall' onClick={e => this.handleUpgrade(e)}>
                  +
                </button>
              </td>
            </tr>
            <tr>
              <th scope='row'>CPU:</th>
              <td>{this.state.cpu}</td>
              <td>
                <button name='cpu' onClick={e => this.handleUpgrade(e)}>
                  +
                </button>
              </td>
            </tr>
            <tr>
              <th scope='row'>AntiVirus:</th>
              <td>{this.state.antiVirus}</td>
              <td>
                <button name='antiVirus' onClick={e => this.handleUpgrade(e)}>
                  +
                </button>
              </td>
            </tr>
            <tr>
              <th scope='row'>Encryption:</th>
              <td>{this.state.encryption}</td>
              <td>
                <button name='encryption' onClick={e => this.handleUpgrade(e)}>
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        {/* 4th table Items here */}
      </div>
    );
  }
}
