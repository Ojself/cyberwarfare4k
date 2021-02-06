import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cryptoStyle.scss";
import {
  Container,
  Col,
  Row,
  UncontrolledTooltip,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Table,
} from "reactstrap";
import Tutorial from "../_molecules/Tutorial";
import KFormatter from "../_helpers/KFormatter";
import CryptoCurrenciesChart from "./CryptoCurrencies";
import api from "../../../api";

// todo: rename user and loading
const CryptoCurrencies = ({ globalLoading, user, updateGlobalValues }) => {
  const [cryptoState, setCryptoState] = useState({
    currencies: [],
    loading: true,
    massagedCurrency: null,
    Litecoin: false,
    Ethereum: false,
    Doge: false,
    Monero: false,
    Zcash: false,
    Dash: false,
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
      };
    });
    return data;
  };

  const handleBuy = async (e) => {
    const { name } = e.target;
    const amount = cryptoState[name];

    let data;

    try {
      data = await api.buyCrypto({ name, amount });
      setCryptoState({
        ...cryptoState,
        Litecoin: false,
        Ethereum: false,
        Doge: false,
        Monero: false,
        Zcash: false,
        Dash: false,
      });
    } catch (err) {
      console.error(err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const handleSell = async (e) => {
    const { name } = e.target;
    const amount = cryptoState[name];
    let data;

    try {
      data = await api.sellCrypto({ name, amount });
      setCryptoState({
        ...cryptoState,
        Litecoin: false,
        Ethereum: false,
        Doge: false,
        Monero: false,
        Zcash: false,
        Dash: false,
      });
    } catch (err) {
      console.error(err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const handleInputChange = (e) => {
    setCryptoState({
      ...cryptoState,
      [e.target.name]: e.target.value,
    });
  };

  const allCharts = cryptoState.massagedCurrency && (
    <>
      <Row>
        <Col
          lg="4"
          md="12"
          style={{
            width: "100%",
            height: "40vh",
          }}
        >
          <CryptoCurrenciesChart
            key={0}
            data={[cryptoState.massagedCurrency[0]]}
          />
        </Col>
        <Col
          lg="4"
          md="12"
          style={{
            width: "100%",
            height: "40vh",
          }}
        >
          <CryptoCurrenciesChart
            key={1}
            data={[cryptoState.massagedCurrency[1]]}
          />
        </Col>
        <Col
          lg="4"
          md="12"
          style={{
            width: "100%",
            height: "40vh",
          }}
        >
          <CryptoCurrenciesChart
            key={2}
            data={[cryptoState.massagedCurrency[2]]}
          />
        </Col>
      </Row>
      <Row>
        <Col
          lg="4"
          md="12"
          style={{
            width: "100%",
            height: "40vh",
          }}
        >
          <CryptoCurrenciesChart
            key={3}
            data={[cryptoState.massagedCurrency[3]]}
          />
        </Col>
        <Col
          lg="4"
          md="12"
          style={{
            width: "100%",
            height: "40vh",
          }}
        >
          <CryptoCurrenciesChart
            key={4}
            data={[cryptoState.massagedCurrency[4]]}
          />
        </Col>
        <Col
          lg="4"
          md="12"
          style={{
            width: "100%",
            height: "40vh",
          }}
        >
          <CryptoCurrenciesChart
            key={5}
            data={[cryptoState.massagedCurrency[5]]}
          />
        </Col>
      </Row>
    </>
  );
 
  const actionButtons = (
    <tr className="" style={{ height: "10vh", backgroundColor: "#696b78" }}>
      <td colspan="4" style="width:100%" style={{ verticalAlign: "middle" }}>
        <Button
          onClick={() => setTransactionState(user.stash)}
          color="outline-danger"
        >
          Sell all
        </Button>{" "}
      </td>
      <td colspan="1" style="width:100%" style={{ verticalAlign: "middle" }}>
        <Button onClick={() => handleSell()} color="danger">
          Sell
        </Button>{" "}
      </td>
      <td colspan="1" style="width:100%" style={{ verticalAlign: "middle" }}>
        <Button onClick={() => handleBuy()} color="success">
          Buy
        </Button>{" "}
      </td>
      <td colspan="3" style="width:100%" style={{ verticalAlign: "middle" }}>
        <Button
          onClick={() =>
            setTransactionState(
              getMaxBuyingVolume(user, shopStash, city.stashPriceMultiplier)
            )
          }
          color="outline-success"
        >
          Max
        </Button>{" "}
      </td>
    </tr>
  );

  const cryptoTable = cryptoState.currencies.length && (
    <Table className="crypto-table mt-4" size="sm" responsive dark striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Market cap</th>
          <th>Change last hour</th>
          <th>Available</th>
          <th>You have</th>
          <th className="display-none-when-mobile">Last purchased by:</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {cryptoState.currencies.map((cu, i) => {
          const prevPrice = cu.historyPrice[cu.historyPrice.length - 2];
          const changeFromLastHour = ((cu.price - prevPrice) / prevPrice) * 100;
          return (
            <tr key={i}>
              <th title={cu.initials} scope="row">
                {cu.name}
              </th>
              <td>{cu.price}</td>
              <td>{KFormatter(cu.marketCap)}</td>
              <td
                style={
                  changeFromLastHour > 0
                    ? { color: "#00b909" }
                    : { color: "#c60606" }
                }
              >
                {changeFromLastHour.toFixed(2)}%
              </td>
              <td>{KFormatter(Math.floor(cu.available))}</td>
              <td>{globalLoading ? 0 : user.currencies[cu.name]}</td>
              {cu.lastPurchasedBy ? (
                <td className="display-none-when-mobile">
                  <Link
                    className="text-white"
                    to={`hacker/${cu.lastPurchasedBy._id}`}
                  >
                    {cu.lastPurchasedBy.name}
                  </Link>
                </td>
              ) : (
                <td className="display-none-when-mobile"> - </td>
              )}
              <td>
                <InputGroup id={`disableTip${i}`}>
                  <Input
                    step={10}
                    min={0}
                    placeholder={0}
                    type="number"
                    name={cu.name}
                    value={cryptoState[cu.name]}
                    onChange={handleInputChange}
                    disabled={
                      globalLoading || cu.levelReq >= user.playerStats.rank
                    }
                  />

                    <InputGroupAddon
                    className="d-flex flex-row"
                    addonType="append"
                  >
                    <Button
                      name={cu.name}
                      onClick={(e) => handleBuy(e)}
                      disabled={
                        globalLoading || cu.levelReq >= user.playerStats.rank
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
                        You're too unexperineced to buy this currency
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
          );
        })}
        {/* {actionButtons} */}
      </tbody>
    </Table>
  );

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-center">
          <h1>Crypto Currency</h1>
          <Tutorial section={"Crypto Currency"} />
        </Col>
      </Row>
      {!cryptoState.loading && (
        <>
          <Row className="d-flex justify-content-center mt-4">
            <Col  lg="10" md="12">
              {cryptoTable}
            </Col>
          </Row>
          {allCharts}
        </>
      )}
    </Container>
  );
};
export default CryptoCurrencies;
