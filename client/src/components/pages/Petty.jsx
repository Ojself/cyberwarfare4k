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
      hacking: false
    };
    this.startHack = this.startHack.bind(this);
    this.toggleHack = this.toggleHack.bind(this);
  }

  componentDidMount() {
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
  }

  toggleHack() {
    this.setState({
      hacking: !this.state.hacking
    });
    setTimeout(() => {
      this.startHack();
    }, 100);
  }

  startHack() {
    console.log('start hack', this.state.hacking);
    if (this.state.hacking) {
      let pettyHackInterval = setInterval(() => {
        console.log('interval');
        if (!this.state.hacking) {
          console.log('clearing');
          clearInterval(pettyHackInterval);
        }
        api
          .pettyHack()
          .then(result => {
            console.log(result);
          })
          .catch(err => console.log(err));
      }, 4000);
    }
  }

  render() {
    return (
      <div className='CreateHacker'>
        <h2>Petty hackr</h2>
        <button onClick={this.toggleHack}>Start hacking</button>
        {this.state.message && <div className='info'>{this.state.message}</div>}
      </div>
    );
  }
}
