import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Table
} from "reactstrap";

import KFormatter from "../_helpers/KFormatter";
import CryptoCurrenciesChart from "./CryptoCurrencies";
import api from "../../../api";

// todo: rename user and loading
const CryptoCurrencies = props => {
  const [cryptoState, setCryptoState] = useState({
    currencies: null,
    loading: true,
    massagedCurrency: null,
    Litecoin: 0,
    Ethereum: 0,
    Ripple: 0,
    Monero: 0,
    Zcash: 0
  });

  useEffect(() => {
    api.getCrypto().then(result => {
      const massagedCurrency = result.currency.map(el => dataMassager(el));

      setCryptoState({
        ...cryptoState,
        currencies: result.currency,
        massagedCurrency,
        loading: false
      });
    });
  }, []);

  const dataMassager = apiData => {
    const data = {
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
    return data;
  };

  const handleBuy = e => {
    /* todo, some frontend check maybe? */
    const { name } = e.target;
    const amount = cryptoState[name];
    api.buyCrypto({ name, amount }).then(result => {
      setCryptoState({
        ...cryptoState,
        Litecoin: 0,
        Ethereum: 0,
        Ripple: 0,
        Monero: 0,
        Zcash: 0
      });
    });
  };

  const handleSell = e => {
    const { name } = e.target;
    const amount = cryptoState[name];
    api.sellCrypto({ name, amount }).then(result => {
      setCryptoState({
        ...cryptoState,
        Litecoin: 0,
        Ethereum: 0,
        Ripple: 0,
        Monero: 0,
        Zcash: 0
      });
    });
  };

  const handleInputChange = e => {
    setCryptoState({
      ...cryptoState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="" style={{ height: "100vh", width: "100vw" }}>
      <h2>Currency</h2>
      {cryptoState.loading ? (
        <p>loading...</p>
      ) : (
          <>
            <Table dark striped>
              <thead>
                <tr>
                  <th>Symbol{/* todo add icon */}</th>
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
                {cryptoState.currencies.map((cu, i) => (
                  <tr key={i}>
                    <th scope="row">{cu.initials}</th>
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
                          ? { color: "#00b909" }
                          : { color: "#c60606" }
                      }
                    >
                      {(
                        ((cu.historyPrice[cu.historyPrice.length - 1] -
                          cu.historyPrice[0]) /
                          cu.historyPrice[0]) *
                        100
                      ).toFixed(2)}
                      %
                  </td>
                    {/* TODO icon  */}
                    <td>{KFormatter(cu.available)}</td>
                    <td>{props.loading ? 0 : props.user.currencies[cu.name]}</td>
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
                      <InputGroup id={`disableTip${i}`}>
                        <Input
                          step={10}
                          min={0}
                          type="number"
                          name={cu.name}
                          value={cryptoState[cu.name]}
                          onChange={handleInputChange}
                          disabled={
                            props.loading ||
                            cu.levelReq >= props.user.playerStats.rank
                          }
                        />

                        <InputGroupAddon addonType="append">
                          <Button
                            name={cu.name}
                            onClick={e => handleBuy(e)}
                            disabled={
                              props.loading ||
                              cu.levelReq >= props.user.playerStats.rank
                            }
                          >
                            BUY
                        </Button>
                        </InputGroupAddon>
                        {props.loading ||
                          (cu.levelReq >= props.user.playerStats.rank && (
                            <UncontrolledTooltip
                              placement="top"
                              target={`disableTip${i}`}
                            >
                              You're too unexperineced too buy this currency
                          </UncontrolledTooltip>
                          ))}
                        <InputGroupAddon addonType="append">
                          <Button name={cu.name} onClick={e => handleSell(e)}>
                            SELL
                        </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <CryptoCurrenciesChart data={[cryptoState.massagedCurrency[0]]} />
            <CryptoCurrenciesChart data={[cryptoState.massagedCurrency[1]]} />
            <CryptoCurrenciesChart data={[cryptoState.massagedCurrency[2]]} />
            <CryptoCurrenciesChart data={[cryptoState.massagedCurrency[3]]} />
            <CryptoCurrenciesChart data={[cryptoState.massagedCurrency[4]]} />
            {/* <CryptoCurrenciesChart data={[cryptoState.massagedCurrency[5]]} /> */}
          </>
        )}
    </div>
  );
};

export default CryptoCurrencies;
