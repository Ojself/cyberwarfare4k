import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cryptoStyle.scss";
import {
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Table,
} from "reactstrap";

import KFormatter from "../_helpers/KFormatter";
import CryptoCurrenciesChart from "./CryptoCurrencies";
import api from "../../../api";

// todo: rename user and loading
const CryptoCurrencies = ({ globalLoading, user, updateGlobalValues }) => {
  const [cryptoState, setCryptoState] = useState({
    currencies: null,
    loading: true,
    massagedCurrency: null,
    Litecoin: 0,
    Ethereum: 0,
    Ripple: 0,
    Monero: 0,
    Zcash: 0,
    Dash:0
  });

  useEffect(() => {
    const fetchCryptoData = async () => {
      const data = await api.getCrypto();
      const massagedCurrency = data.currency.map((currency) =>
        dataMassager(currency)
      );
      setCryptoState({
        ...cryptoState,
        currencies: data.currency,
        massagedCurrency,
        loading: false,
      });
    };
    fetchCryptoData();
  }, []);

  const dataMassager = (apiData) => {
    const data = {
      id: apiData.name,
      colors: apiData.color,
      data: [],
    };
    data.data = apiData.historyTime.map((_, i) => {
      return {
        x: apiData.historyTime[i],
        y: apiData.historyPrice[i],
      }
    });
    return data;
  };

  const handleBuy = async (e) => {
    /* todo, some frontend check maybe? */
    const { name } = e.target;
    const amount = cryptoState[name];

    let data;
    
    try {
      data = await api.buyCrypto({ name, amount })
      setCryptoState({
        ...cryptoState,
        Litecoin: 0,
        Ethereum: 0,
        Ripple: 0,
        Monero: 0,
        Zcash: 0,
        Dash:0
      });
    }catch(err){
      console.error(err)
      return updateGlobalValues(err)
    }
    updateGlobalValues(data)
  };

  const handleSell = async (e) => {
    const { name } = e.target;
    const amount = cryptoState[name];
    let data;
    
    try {
      data = await api.sellCrypto({ name, amount })
      setCryptoState({
        ...cryptoState,
        Litecoin: 0,
        Ethereum: 0,
        Ripple: 0,
        Monero: 0,
        Zcash: 0,
        Dash: 0,
      });
   } catch(err){
     console.error(err)
      return updateGlobalValues(err)
    }
    updateGlobalValues(data)
  }

  const handleInputChange = (e) => {
    setCryptoState({
      ...cryptoState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page-container">
      <h1>Currency</h1>
      {cryptoState.loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Table className="content" dark striped>
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
                  <td>{globalLoading ? 0 : user.currencies[cu.name]}</td>
                  {cu.lastPurchasedBy[0] ? (
                    <td>
                      <Link className="text-white" to={`profile/${cu.lastPurchasedBy[0]._id}`}>
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
                          globalLoading || cu.levelReq >= user.playerStats.rank
                        }
                      />

                      <InputGroupAddon addonType="append">
                        <Button
                          name={cu.name}
                          onClick={(e) => handleBuy(e)}
                          disabled={
                            globalLoading ||
                            cu.levelReq >= user.playerStats.rank
                          }
                        >
                          BUY
                        </Button>
                      </InputGroupAddon>
                      {globalLoading ||
                        (cu.levelReq >= user.playerStats.rank && (
                          <UncontrolledTooltip
                            placement="top"
                            target={`disableTip${i}`}
                          >
                            You're too unexperineced too buy this currency
                          </UncontrolledTooltip>
                        ))}
                      <InputGroupAddon addonType="append">
                        <Button name={cu.name} onClick={(e) => handleSell(e)}>
                          SELL
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Charts */}
          {/* possible issue is length of ccc array */}
          <div className="chartsRow text-dark">
            <div className="chartContainer">
              <CryptoCurrenciesChart
                key={0}
                data={[cryptoState.massagedCurrency[0]]}
              />
            </div>
            <div className="chartContainer ">
              <CryptoCurrenciesChart
                key={1}
                data={[cryptoState.massagedCurrency[1]]}
              />
            </div>
            <div className="chartContainer">
              <CryptoCurrenciesChart
                key={2}
                data={[cryptoState.massagedCurrency[2]]}
              />
            </div>
          </div>
          <div className="chartsRow ">
            <div className="chartContainer ">
              <CryptoCurrenciesChart
                key={3}
                data={[cryptoState.massagedCurrency[3]]}
              />
            </div>
            <div className="chartContainer">
              <CryptoCurrenciesChart
                key={4}
                data={[cryptoState.massagedCurrency[4]]}
              />
            </div>
            <div className="chartContainer">
              <CryptoCurrenciesChart
                key={5}
                data={[cryptoState.massagedCurrency[5]]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CryptoCurrencies;
