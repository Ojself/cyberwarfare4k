import React, { useState, useEffect } from "react";
import api from "../../../api";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./fence.scss";
import Tutorial from "../_molecules/Tutorial";
const MAX_ALLOWED_STASH = 50;

const defaultColors = ["red", "blue", "orange", "green"];

const defaultValues = {
  Cables: 0,
  Computer: 0,
  "EyeSpy Digital Spy Recorder": 0,
  "HackRf One": 0,
  Keylogger: 0,
  "Linux for dummies": 0,
  "Lock pick set": 0,
  Magspoof: 0,
  "Mini Hidden Camera": 0,
  "Proxmark3 Kit": 0,
  "Raspberry Pi": 0,
  "Rubber Ducky": 0,
  "Ubertooth One": 0,
  "WiFi Pineapple": 0,
};

const getMaxBuyingVolume = (user, stashes, cityMultiplier) => {
  const copiedStashes = JSON.parse(JSON.stringify(stashes));
  let wallet = user.playerStats.bitCoins;
  const max = copiedStashes
    .map((stash) => {
      stash.price = stash.price * cityMultiplier;
      return stash;
    })
    .sort((a, b) => b.price - a.price)
    .map((stash) => {
      const { name, price } = stash;
      const amountHeldByUser = user.stash[name];
      const userHasTooMuchStash = MAX_ALLOWED_STASH - amountHeldByUser <= 0;

      let amountCanBuy = Math.floor(wallet / price);
      if (amountCanBuy > 50) {
        amountCanBuy = 50;
      }
      amountCanBuy -= amountHeldByUser;

      if (userHasTooMuchStash || wallet < price || amountCanBuy <= 0) {
        return { [name]: 0 };
      }
      wallet -= amountCanBuy * price;
      return { [name]: amountCanBuy };
    });
  return Object.assign({}, ...max);
};

const objectIsEmpty = (obj) => {
  return Object.values(obj).every((val) => val === 0);
};

export const Fence = ({ globalLoading, user, updateGlobalValues }) => {
  const [shopStash, setShopStash] = useState([]);
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionState, setTransactionState] = useState(defaultValues);

  const getStashColor = (index) => {
    return defaultColors[index % defaultColors.length];
  };

  const handleTransactionChange = (event) => {
    setTransactionState({
      ...transactionState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSell = async () => {
    if (objectIsEmpty(transactionState)) return;
    let data;
    try {
      data = await api.sellStashes(transactionState);
    } catch (err) {
      console.error("error", err);
      updateGlobalValues(err, true, true);
      return;
    }
    updateGlobalValues(data, true, true);
    setTransactionState(defaultValues);
  };

  const handleBuy = async () => {
    if (objectIsEmpty(transactionState)) return;
    let data;
    try {
      data = await api.buyStashes(transactionState);
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setTransactionState(defaultValues);
  };

  useEffect(() => {
    const getStashes = async () => {
      let data;
      try {
        data = await api.getStashes();
      } catch (err) {
        console.error(err, "err");
        return updateGlobalValues(err);
      }
      console.log(data, "data");
      setCity(data.city);
      setShopStash(data.stashes);
      setLoading(false);
      updateGlobalValues(data);
    };
    getStashes();
  }, []);

  const tableBody =
    !loading &&
    !globalLoading &&
    shopStash.map((stash, i) => {
      const { name, price } = stash;
      const { stashPriceMultiplier } = city;
      const userStashAmount = user.stash[name];

      return (
        <tr key={name}>
          <td className="d-flex align-items-center">
            <img
              style={{ maxHeight: "30px", maxWidth: "30px", width: "100%" }}
              src={`/stashPics/${name}/${getStashColor(i)}.png`}
              title={name}
              alt={name}
            />
            <div className="m-auto">{name}</div>
          </td>
          <td>{userStashAmount ? userStashAmount : "--"}</td>
          <td>
            <span className="bitcoinColor">&#8383;</span>
            {(price * stashPriceMultiplier).toFixed(2)}
          </td>
          <td>
            <Form>
              <FormGroup className="mb-0">
                <Input
                  onChange={(e) => {
                    handleTransactionChange(e);
                  }}
                  type="number"
                  value={transactionState[name]}
                  min={0}
                  step={1}
                  name={name}
                />
              </FormGroup>
            </Form>
          </td>
        </tr>
      );
    });

  const buttonGroup = (
    <tr className="" style={{ height: "10vh", backgroundColor: "#696b78" }}>
      <td style={{ verticalAlign: "middle" }}>
        <Button
          onClick={() => setTransactionState(user.stash)}
          color="outline-danger"
        >
          Sell all
        </Button>{" "}
      </td>
      <td style={{ verticalAlign: "middle" }}>
        <Button onClick={() => handleSell()} color="danger">
          Sell
        </Button>{" "}
      </td>
      <td style={{ verticalAlign: "middle" }}>
        <Button onClick={() => handleBuy()} color="success">
          Buy
        </Button>{" "}
      </td>
      <td style={{ verticalAlign: "middle" }}>
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

  const tableOverview = (
    <Container className="p-2">
      <Row className="d-flex justify-content-center">
        <Col sm="12" md="10" className="p-0">
          <Table className="" size={"sm"} dark>
            <thead>
              <tr>
                <th>ITEM</th>
                <th>YOU HAVE</th>
                <th>PRICE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
              {buttonGroup}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );

  return (
    <div className="fence-page-container">
      <div className="d-flex justify-content-center">
        <h1>Fence</h1>
        <Tutorial size="md" section="Fence" />
      </div>
      <h6>{city ? city.name : "City"}</h6>
      <div className="content">{tableOverview}</div>
    </div>
  );
};

export default Fence;
