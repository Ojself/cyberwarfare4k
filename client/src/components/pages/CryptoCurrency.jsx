import React, { Component } from 'react';
import {
  /* Route, */ Link /* , NavLink as NavLinkRR, Switch */
} from 'react-router-dom';
import { InputGroup, InputGroupAddon, Input, Button, Table } from 'reactstrap';

import KFormatter from '../utils/KFormatter';
import api from '../../api';
import CryptoCurrenciesChart from './chart/CryptoCurrencies';

export default class CryptoCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: null,
      loading: true,
      massagedCurrency: null,
      Litecoin: 0,
      Ethereum: 0,
      Ripple: 0,
      Monero: 0,
      Zcash: 0
    };
    /* this.dataMassager = this.dataMassager.bind(this); */
    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    api.getCrypto().then(result => {
      let massagedCurrency = result.currency.map(el => {
        return this.dataMassager(el);
      });
      this.setState({
        currencies: result.currency,
        massagedCurrency,
        loading: false
      });
    });
  }

  /* todo change color, sizing etc */
  dataMassager(apiData) {
    let data = {
      id: apiData.name,
      colors: apiData.color,
      data: []
    };
    apiData.historyTime.forEach((el, i) => {
      data.data.push({
        x: `h: ${apiData.historyTime[i]}`,
        y: apiData.historyPrice[i]
      });
    });
    console.log(data, 'data');
    return data;
  }

  handleBuy(e) {
    /* todo, some frontend check maybe? */
    const { name } = e.target;
    const amount = this.state[name];
    api.buyCrypto({ name, amount }).then(result => {
      this.setState({
        Litecoin: 0,
        Ethereum: 0,
        Ripple: 0,
        Monero: 0,
        Zcash: 0
      });
    });
  }

  handleSell(e) {
    console.log(e.target, 'e');
    const { name } = e.target;
    const amount = this.state[name];
    api.sellCrypto({ name, amount }).then(result => {
      console.log(result, 'result sell');
      this.setState({
        Litecoin: 0,
        Ethereum: 0,
        Ripple: 0,
        Monero: 0,
        Zcash: 0
      });
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    console.log(this.state, 'state');

    return (
      <div className='' style={{ height: '100vh', width: '100vw' }}>
        <h2>Currency</h2>
        {this.state.loading ? (
          <p>loading...</p>
        ) : (
          <>
            <Table dark striped>
              <thead>
                <tr>
                  <th>Symbol{/* symbol and icon */}</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Market cap</th>
                  <th>Change 12h</th>
                  <th>Available</th>
                  <th>You have</th>
                  <th>Last purchased by:</th>
                  <th>Purchase</th>
                </tr>
              </thead>
              <tbody>
                {this.state.currencies.map((cu, i) => (
                  <tr>
                    <th scope='row'>{cu.initials}</th>
                    <td>{cu.name}</td>
                    <td>{cu.price}</td>
                    <td>{KFormatter(cu.marketCap)}</td>
                    <td
                      style={
                        ((cu.historyPrice[cu.historyPrice.length - 1] -
                          cu.historyPrice[0]) /
                          cu.historyPrice[0]) *
                          100 >
                        0
                          ? { color: '#00b909' }
                          : { color: '#c60606' }
                      }
                    >
                      {(
                        ((cu.historyPrice[cu.historyPrice.length - 1] -
                          cu.historyPrice[0]) /
                          cu.historyPrice[0]) *
                        100
                      ).toFixed(2)}
                      %
                    </td>{' '}
                    {/* TODO icon and style that says if positive number give green else red and + - */}
                    <td>{KFormatter(cu.available)}</td>
                    <td>
                      {this.props.propsloading
                        ? 0
                        : this.props.propsuser.currencies[cu.name]}
                    </td>
                    {/* Displays none if noone has made a purchase of the currency */}
                    {cu.lastPurchasedBy[0] ? (
                      <td>
                        <Link to={`profile/${cu.lastPurchasedBy[0]._id}`}>
                          {cu.lastPurchasedBy[0].name}
                        </Link>
                      </td>
                    ) : (
                      <td> none </td>
                    )}
                    <td>
                      <InputGroup>
                        <Input
                          step={10}
                          min={0}
                          type='number'
                          name={cu.name}
                          value={this.state[cu.name]}
                          onChange={this.handleInputChange}
                        />
                        <InputGroupAddon addonType='append'>
                          <Button
                            name={cu.name}
                            onClick={e => this.handleBuy(e)}
                          >
                            BUY
                          </Button>
                        </InputGroupAddon>
                        <InputGroupAddon addonType='append'>
                          <Button
                            name={cu.name}
                            onClick={e => this.handleSell(e)}
                          >
                            SELL
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <CryptoCurrenciesChart data={[this.state.massagedCurrency[0]]} />
            <CryptoCurrenciesChart data={[this.state.massagedCurrency[1]]} />
            <CryptoCurrenciesChart data={[this.state.massagedCurrency[2]]} />
            <CryptoCurrenciesChart data={[this.state.massagedCurrency[3]]} />
            <CryptoCurrenciesChart data={[this.state.massagedCurrency[4]]} />
          </>
        )}
      </div>
    );
  }
}
