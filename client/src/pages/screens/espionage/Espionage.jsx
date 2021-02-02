import React, { useState, useEffect } from "react";
import api from "../../../api";
import {
  Button,
  Card,
  CardText,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  ListGroup,
  Row,
} from "reactstrap";
import Select from "react-select";
import ActiveSpy from "./ActiveSpy";
import Tutorial from "../_molecules/Tutorial";

const Espionage = ({
  updateGlobalValues,
  globalLoading,
  user,
  setUnreadNotification,
}) => {
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState(false);
  const [vaultAmount, setVaultAmount] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [activeSpies, setActiveSpies] = useState([]);
  const [opponents, setOpponents] = useState([]);

  useEffect(() => {
    const getVaultInformation = async () => {
      let data;
      try {
        data = await api.getVaultInformation();
      } catch (err) {
        console.error("Error: ", err);
        return;
      }
      setActiveSpies(data.activeSpies);
      setOpponents(dataMassagerForSelectComponent(data.opponents));
      setLoading(false);
    };
    getVaultInformation();
  }, []);

  const deposit = async () => {
    let data;
    try {
      data = await api.depositVault(depositAmount);
      setDepositAmount(false);
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const cancelSpy = async (id) => {
    let data;
    try {
      data = await api.cancelSpy(id);
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
    setActiveSpies(data.activeSpies);
  };

  const dataMassagerForSelectComponent = (userArray) => {
    return userArray.map((u) => {
      return {
        value: u._id,
        label: u.name,
      };
    });
  };

  const checkDisabledAddTopButton = () => {
    return !vaultAmount || !selectedOption || !selectedOption.value;
  };

  const sendSpy = async (opponentId, bitCoinSpent) => {
    if (!opponentId || !bitCoinSpent) return;
    let data;
    try {
      data = await api.sendSpy(opponentId, bitCoinSpent);
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
    setActiveSpies(data.activeSpies);
  };

  const vault = !globalLoading && (
    <div>
      <Card body className="text-light">
        <CardText>
          <Tutorial size="sm" section="Vault" />
          <strong>In vault</strong>:{" "}
          <span className="bitcoinColor">&#8383;</span>
          {Math.floor(user.playerStats.vault)}
        </CardText>
        <CardText>
          On hand: <span className="bitcoinColor">&#8383;</span>
          {Math.floor(user.playerStats.bitCoins)}
        </CardText>
        <div className="w-100 d-flex flex-column align-items-center">
          <InputGroup className="w-75">
            <InputGroupAddon addonType="prepend">&#8383;</InputGroupAddon>
            <Input
              type="number"
              min={0}
              max={user.playerStats.bitCoins}
              step="10000"
              placeholder="Amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
          </InputGroup>
          <Button
            type="submit"
            className="w-75 my-2 mx-auto"
            color="outline-light"
            onClick={() => deposit()}
          >
            Deposit
          </Button>
        </div>
      </Card>
    </div>
  );

  const sendSpies = !globalLoading && (
    <div className="">
      <div className="">
        <Form>
          <Select
            className="text-dark"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e)}
            options={loading ? [] : opponents}
          />
        </Form>
      </div>
      <div className="">
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText className="bitcoinColor">&#8383;</InputGroupText>
          </InputGroupAddon>
          <Input
            type="number"
            min={0}
            max={user.playerStats.vault}
            step="10000"
            placeholder="Amount"
            value={vaultAmount}
            name="bountyTopInput"
            onChange={(e) => setVaultAmount(e.target.value)}
          />
        </InputGroup>
        <p style={{ fontSize: "0.75rem" }} className="text-muted">
          {" "}
          Minimum 100000
        </p>
      </div>
      <div className="">
        <Button
          color="outline-danger"
          disabled={checkDisabledAddTopButton()}
          onClick={() => sendSpy(selectedOption.value, vaultAmount)}
        >
          Send spy!
        </Button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <div className="d-flex justify-content-center">
        <h1> Espionage </h1>
        <Tutorial section="Espionage" />
      </div>
      <Container>
        {activeSpies.length ? (
          <Row>
            <Col>
              <h4>Active spies:</h4>
              <ListGroup>
                {activeSpies.map((spy) => {
                  return (
                    <ActiveSpy
                      key={spy.id}
                      cancelSpy={cancelSpy}
                      spy={spy}
                      setUnreadNotification={setUnreadNotification}
                    />
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        ) : null}
        <Row className="mt-5">
          <Col sm="12" md="6">
            {vault}
          </Col>
          <Col sm="12" md="6">
            {sendSpies}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Espionage;
