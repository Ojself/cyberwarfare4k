import React, { Component } from 'react';
import api from '../../api';

import { Table, Button } from 'reactstrap';

export default class DataCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataCenters: [],
      message: null,
      loading: true
    };

    this.handleDataCenterPurchase = this.handleDataCenterPurchase.bind(this);
  }

  componentDidMount() {
    api.getDataCenters().then(result => {
      console.log(result, 'result fuck');
      this.setState({ dataCenters: result.dataCenters, loading: false });
    });
  }

  handleDataCenterPurchase(e) {
    const dataCenterName = e.target.name;
    console.log(dataCenterName, 'centername');
    api.purchaseDataCenter({ dataCenterName }).then(result => {
      console.log(result, 'result purchase');
      this.setState({ loading: true });
    });
  }

  render() {
    console.log(this.state, ' state render');

    const dataCenterTable = (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            {/* Price only available when not owned */}
            <th>Price</th>
            <th>Status</th>
            <th>Required Stash</th>
            <th>Revenue /m</th>
            <th>Purchase / Attack</th>
            {/* <th>Difficulty</th> */}
            <th>Health</th>
            <th>Attacker</th>
            <th>Alliance</th>
          </tr>
        </thead>
        <tbody>
          {this.state.dataCenters.map(dc => (
            <tr key={dc._id}>
              <th scope='row'>{dc.name}</th>
              <td>{dc.price}</td>
              <td>{dc.status}</td>
              <tr>
                {/* shouldn't be visible if it's not purchased yet */}
                <td>{dc.requiredStash[0].name}</td>
                <td>{dc.requiredStash[1].name}</td>
                <td>{dc.requiredStash[2].name}</td>
              </tr>
              <td>{dc.minutlyrevenue}</td>
              <td>
                <Button
                  name={dc.name}
                  onClick={e => this.handleDataCenterPurchase(e)}
                >
                  BUY
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );

    return (
      <div>
        <h2>Wanted list</h2>
        {this.state.loading ? <p>a</p> : dataCenterTable}
      </div>
    );
  }
}
