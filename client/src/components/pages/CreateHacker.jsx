import React, { Component } from 'react';
import api from '../../api';

export default class CreateHacker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: null,
      user: null,
      success: true,
      name: '',
      city: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleUpgrade = this.handleUpgrade.bind(this);
  }

  componentDidMount() {
    console.log('mountng');
    api
      .getUser()
      .then(result => {
        this.setState({
          message: result.message,
          loading: false,
          user: result.user
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })

      .catch(err => console.log(err));
    console.log(this.state);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      name: this.state.name,
      cityString: this.state.city
    };
    api
      .createUser(data)
      .then(result => {
        console.log('SUCCESS!');
        this.setState({
          message: `Your user '${this.state.name}' has been created`
        });
        setTimeout(() => {
          this.setState({
            message: ''
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  handleUpgrade(e) {
    e.preventDefault();
    console.log(e.target.name, 'e.target');
    let data = e.target.name;
    api
      .upgradeStats(data)
      .then(result => {
        console.log('SUCCESS!', result);
        /* make screen blink green? */
        this.setState({
          message: `${result.message}`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className='CreateHacker'>
        <h2>Create a haxor</h2>
        <form>
          Name:{' '}
          <input
            type='text'
            value={this.state.name}
            name='name'
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <h2>
            Statpoints:{' '}
            {this.state.loading ? 0 : this.state.user.playerStats.statPoints}
          </h2>
          CPU:{' '}
          <button name='cpu' onClick={this.handleUpgrade}>
            CPU
          </button>
          Antivirus: <button>ANTIVIRUS</button>
          Encryption: <button>ENCRYPTION</button>
          <br />
          city:{' '}
          <input
            type='text'
            value={this.state.city}
            name='city'
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <br />
          <br />
          <button onClick={e => this.handleClick(e)}>Create haxor</button>
        </form>
        {this.state.message && <div className='info'>{this.state.message}</div>}
      </div>
    );
  }
}
