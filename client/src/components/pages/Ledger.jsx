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
  Col,
} from "reactstrap";

const Ledger = (props) => {
  const [ledgerState, setLedgerState] = useState({
    users: null,
    depositAmount: null,
    transferAmount: null,
    receiver: "",
    selectedOption: null,
    loading: true,
    message: null,
  });
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const fetchLedgeUsers = async () => {
      const data = await api.getLedgerUsers();
      console.log(data, "data");
      const { users } = data;
      const massagedUsers = dataMassager(users);

      setLedgerState({
        ...ledgerState,
        loading: false,
        message: data.message,
        users: massagedUsers,
      });
    };
    fetchLedgeUsers();
  }, [console.log("STATE", ledgerState)]);

  const dataMassager = (userArray) => {
    const massagedUsers = [];
    userArray.forEach((u) => {
      massagedUsers.push({
        value: u._id,
        label: u.name,
      });
    });
    return massagedUsers;
  };

  const handleChange = (selectedOption) => {
    setLedgerState({ ...ledgerState, selectedOption });
  };

  const handleTransferAmountChange = (e) => {
    setLedgerState({ ...ledgerState, transferAmount: e.target.value });
  };
  const handleDespoitAmountChange = (e) => {
    setLedgerState({ ...ledgerState, depositAmount: e.target.value });
  };

  const handleDeposit = (depositAmount) => {
    api
      .depositBitcoin({
        depositAmount,
      })
      .then((result) => {
        setLedgerState({
          ...ledgerState,
          depositAmount: null,
          message: result.message,
        });
      });
  };

  const handleWithdraw = (depositAmount) => {
    api
      .withdrawBitcoin({
        depositAmount,
      })
      .then((result) => {
        setLedgerState({
          ...ledgerState,
          depositAmount: null,
          message: result.message,
        });
      });
  };

  const handleTransfer = async (transferAmount, receiverId) => {
    console.log("handling transfer");
    const data = await api.transferBitCoins({
      transferAmount,
      receiverId,
    });

    console.log(data, "result");
    setLedgerState({
      ...ledgerState,
      selectedOption: null,
      transferAmount: null,
      message: data.message,
    });
  };
  /* todo center ledger in browser */
  return (
    <div className=" d-flex flex-column align-items-center">
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
            <Col sm="12">
              <Card body className="text-light">
                <CardTitle>5% admission fee </CardTitle>
                <CardText>
                  In ledger: <span style={{ color: "#F08F18" }}>&#8383;</span>
                  {props.loading
                    ? 0
                    : Math.floor(props.user.playerStats.ledger)}
                </CardText>
                <CardText>
                  On hand: <span style={{ color: "#F08F18" }}>&#8383;</span>
                  {props.loading
                    ? 0
                    : Math.floor(props.user.playerStats.bitCoins)}
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
                <Button
                  type="submit"
                  onClick={() => {
                    handleDeposit(ledgerState.depositAmount);
                  }}
                >
                  Depsoit
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    handleWithdraw(ledgerState.depositAmount);
                  }}
                >
                  Withdraw
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <Card body className="text-light">
                <CardTitle>Transfer Bitcoins</CardTitle>
                <CardText>5% admission fee </CardText>
                <CardText>
                  In ledger: <span style={{ color: "#F08F18" }}>&#8383;</span>
                  {props.loading ? 0 : props.user.playerStats.ledger}
                </CardText>
                <Select
                  className="text-dark"
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
                      ledgerState.selectedOption.value /* todo, value or _id? */
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
