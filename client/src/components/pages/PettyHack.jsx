import React, { Component } from 'react';
import api from '../../api';

export default class CreateHacker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      message: null,
      user: null,
      success: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleHack(e) {
    e.preventDefault();
    console.log('start hacking');

    api
      .upgradeStats()
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
        <h2>Petty hackr</h2>
        <button>Start hacking</button>
        {this.state.message && <div className='info'>{this.state.message}</div>}
      </div>
    );
  }
}
