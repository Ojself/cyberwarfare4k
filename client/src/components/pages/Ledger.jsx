import React, { useState, useEffect } from "react";
import api from "../../api";
import classnames from "classnames";
import Select from "react-select";

import {
  InputGroup,
  InputGroupAddon,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";

const Ledger = props => {
  const [ledgerState, setLedgerState] = useState({
    users: null,
    depositAmount: null,
    transferAmount: null,
    receiver: "",
    selectedOption: null,
    loading: true,
    message: null
  });
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    api.getLedgerUsers().then(result => {
      const { users } = result;
      const massagedUsers = dataMassager(users);

      setLedgerState({
        ...ledgerState,
        loading: false,
        message: result.message,
        users: massagedUsers
      });
    });
  }, [console.log("STATE", ledgerState)]);

  const dataMassager = userArray => {
    const massagedUsers = [];
    userArray.forEach(u => {
      massagedUsers.push({
        value: u._id,
        label: u.name
      });
    });

    return massagedUsers;
  };

  const handleChange = selectedOption => {
    setLedgerState({ ...ledgerState, selectedOption });
  };

  const handleTransferAmountChange = e => {
    setLedgerState({ ...ledgerState, transferAmount: e.target.value });
  };
  const handleDespoitAmountChange = e => {
    setLedgerState({ ...ledgerState, depositAmount: e.target.value });
  };

  const handleTransfer = (transferAmount, receiverId) => {
    console.log("handling transfer");
    api
      .transferBitCoins({
        transferAmount,
        receiverId
      })
      .then(result => {
        console.log(result, "result");
        setLedgerState({
          ...ledgerState,
          selectedOption: null,
          transferAmount: null,
          message: result.message
        });
      });
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Deposit
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Transfer
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Deposit / Withdraw Bitcoins</CardTitle>
                <CardText>5% admission fee </CardText>
                <CardText>
                  In ledger: <span style={{ color: "#F08F18" }}>&#8383;</span>
                  {props.loading ? 0 : props.user.playerStats.ledger}
                </CardText>
                <CardText>
                  On hand: <span style={{ color: "#F08F18" }}>&#8383;</span>
                  {props.loading ? 0 : props.user.playerStats.bitCoins}
                </CardText>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">&#8383;</InputGroupAddon>
                  <Input
                    type="number"
                    min={0}
                    step="1"
                    placeholder="Amount"
                    value={ledgerState.depositAmount}
                    onChange={handleDespoitAmountChange}
                  />
                </InputGroup>
                <Button>Depsoit</Button>
                <Button>Withdraw</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Transfer Bitcoins</CardTitle>
                <CardText>5% admission fee </CardText>
                <CardText>
                  In ledger: <span style={{ color: "#F08F18" }}>&#8383;</span>
                  {props.loading ? 0 : props.user.playerStats.ledger}
                </CardText>
                {/* isDisabled isSearchable */}
                <Select
                  value={ledgerState.selectedOption}
                  onChange={handleChange}
                  options={ledgerState.loading ? "" : ledgerState.users}
                />

                <InputGroup>
                  <InputGroupAddon addonType="prepend">&#8383;</InputGroupAddon>
                  <Input
                    type="number"
                    min={0}
                    step="1"
                    placeholder="Amount"
                    value={ledgerState.transferAmount}
                    onChange={handleTransferAmountChange}
                  />
                </InputGroup>
                <Button
                  type="submit"
                  onClick={() => {
                    handleTransfer(
                      ledgerState.transferAmount,
                      ledgerState.selectedOption.value
                    );
                  }}
                >
                  Send
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Ledger;
