import React, { Component } from 'react';
import api from '../../api';

import { Table, Button } from 'reactstrap';

export default class MarketPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      message: null
    };
    this.handleMarketPlaceItemPurchase = this.handleMarketPlaceItemPurchase.bind(
      this
    );
  }

  componentDidMount() {
    api.getMarketPlaceItems().then(result => {
      console.log(result, 'result marketplace');
      this.setState({ items: result.items, loading: false });
    });
  }

  handleMarketPlaceItemPurchase(e) {
    const itemId = e.target.name;
    console.log(itemId, 'centername');
    api.purchaseMarketPlaceItem({ itemId }).then(result => {
      console.log(result, 'result purchase');
    });
  }

  render() {
    console.log(this.state, ' state marketplace');

    const itemsTable = (
      <Table dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Price</th>
            <th>Bonus</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map(item => (
            <tr key={item._id}>
              <th scope='row'>{item.name}</th>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td>{item.bonus}</td>
              <td>
                <Button
                  name={item._id}
                  onClick={e => this.handleMarketPlaceItemPurchase(e)}
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
        <h2>Marketplace</h2>
        {this.state.loading ? <p>a</p> : itemsTable}
      </div>
    );
  }
}
