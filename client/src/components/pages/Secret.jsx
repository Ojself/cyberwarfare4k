import React, { Component } from 'react';
import api from '../../api';

export default class Secret extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secret: null,
      message: null
    }
  }
  render() {
    return (
      <div className="Secret">
        <h2>Secret</h2>

        <div className="result">
          {this.state.secret}
        </div>

        {this.state.message && <div className="info info-danger">
          {this.state.message}
        </div>}
      </div>
    );
  }
  componentDidMount() {
    api.getSecret()
      .then(data => this.setState({ secret: data.secret }))
      .catch(err => this.setState({ message: err.toString() }))
  }
}
