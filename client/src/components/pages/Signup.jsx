import React, { Component } from 'react';
import api from '../../api';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    api
      .signup(data)
      .then(result => {
        console.log('SUCCESS!');
        this.props.history.push('/'); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className='Signup'>
        <h2>Signup</h2>
        <form>
          Email:{' '}
          <input
            type='text'
            value={this.state.email}
            name='email'
            onChange={this.handleInputChange}
          />{' '}
          <br />
          Password:{' '}
          <input
            type='password'
            value={this.state.password}
            name='password'
            onChange={this.handleInputChange}
          />{' '}
          <br />
          <button onClick={e => this.handleClick(e)}>Signup</button>
        </form>
        {this.state.message && (
          <div className='info info-danger'>{this.state.message}</div>
        )}
      </div>
    );
  }
}
