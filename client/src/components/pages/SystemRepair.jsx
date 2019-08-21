import React, { Component } from 'react';
import api from '../../api';

export default class SystemRepair extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: null,
      message: null
    };
  }
  componentDidMount() {
    console.log('mounting');
  }
  handlePartial() {
    api.repairPartial().then(result => {
      console.log(result, 'result');
    });
  }

  handleFull() {
    api.repairFull().then(result => {
      console.log(result, 'result');
    });
  }

  /* todo. styling. add some text about cost or whatevs */
  render() {
    return (
      <div>
        <h2>System Repair</h2>
        <div>
          <div>
            <img src='/pics/partialrepair.jpg' alt='Partial Repari' />
            <button onClick={() => this.handlePartial()}>Partial repair</button>
          </div>
          <div>
            <img src='/pics/fullrepair.jpg' alt='Partial Repari' />
            <button onClick={() => this.handleFull()}>Full repair</button>
          </div>
        </div>
      </div>
    );
  }
}
