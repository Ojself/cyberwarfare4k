import React, { useState, useEffect } from "react";
import api from "../../api";
import classnames from "classnames";
import Select from "react-select";

import ClickAndCopy from "../../components/misc";

import Tutorial from "./_molecules/Tutorial";

import {
  Button,
  Card,
  CardTitle,
  CardText,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  InputGroupText,
} from "reactstrap";

const Ledger = ({ user, globalLoading, updateGlobalValues }) => {
  const [ledgerState, setLedgerState] = useState({
    users: [],
    depositWithdrawAmount: false,
    transferAmount: false,
    receiver: "",
    selectedOption: null,
    loading: true,
  });
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    const fetchLedgeUsers = async () => {
      const data = await api.getLedgerUsers();
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
  }, []);

  const dataMassager = (userArray) => {
    return userArray.map((u) => {
      return {
        value: u._id,
        label: u.name,
      };
    });
  };

  const handleChange = (selectedOption) => {
    setLedgerState({ ...ledgerState, selectedOption });
  };

  const handlePasteToInput = async () => {
    const clipboardValue = await navigator.clipboard.readText();
    setLedgerState({ ...ledgerState, depositWithdrawAmount: clipboardValue });
  };

  const handleTransferAmountChange = (e) => {
    setLedgerState({ ...ledgerState, transferAmount: e.target.value });
  };
  const handleDespoitAmountChange = (e) => {
    setLedgerState({ ...ledgerState, depositWithdrawAmount: e.target.value });
  };

  const handleDeposit = async (
    depositWithdrawAmount = ledgerState.depositWithdrawAmount
  ) => {
    let data;
    try {
      data = await api.depositBitcoin({ depositAmount: depositWithdrawAmount });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setLedgerState({
      ...ledgerState,
      depositWithdrawAmount: false,
    });
  };

  const handleWithdraw = async (
    withdrawAmount = ledgerState.depositWithdrawAmount
  ) => {
    let data;
    try {
      data = await api.withdrawBitcoin({ withdrawAmount });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setLedgerState({
      ...ledgerState,
      depositWithdrawAmount: false,
    });
  };

  const handleTransfer = async (transferAmount, receiverId) => {
    let data;

    try {
      data = await api.transferBitCoins({
        transferAmount,
        receiverId,
      });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setLedgerState({
      ...ledgerState,
      selectedOption: null,
      transferAmount: false,
    });
  };
  /* todo center ledger in browser */
  return (
    <div className=" page-container d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center">
        <h1>Ledger</h1>
        <Tutorial section="Ledger" />
      </div>
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
              <Col sm="12">
                <Card body className="text-light">
                  {/* <CardTitle>0% admission fee </CardTitle> */}
                  <CardText>
                    In ledger: <span className="bitcoinColor">&#8383;</span>
                    {globalLoading ? (
                      0
                    ) : (
                      <ClickAndCopy
                        elementInnerText={Math.floor(user.playerStats.ledger)}
                      />
                    )}
                  </CardText>
                  <CardText>
                    On hand: <span className="bitcoinColor">&#8383;</span>
                    {globalLoading ? (
                      0
                    ) : (
                      <ClickAndCopy
                        elementInnerText={Math.floor(user.playerStats.bitCoins)}
                      />
                    )}
                  </CardText>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      &#8383;
                    </InputGroupAddon>
                    <Input
                      type="number"
                      min={0}
                      step="1000"
                      placeholder="Amount"
                      value={ledgerState.depositWithdrawAmount}
                      onChange={handleDespoitAmountChange}
                    />
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i
                          onClick={() => handlePasteToInput()}
                          className="fas fa-paste"
                          aria-hidden="true"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <Button
                    type="submit"
                    className="w-75 my-2 mx-auto"
                    color="outline-light"
                    onClick={() => {
                      handleDeposit();
                    }}
                  >
                    Deposit
                  </Button>
                  <Button
                    color="outline-light"
                    className="w-75 my-2 mx-auto"
                    type="submit"
                    onClick={() => {
                      handleWithdraw(ledgerState.depositWithdrawAmount);
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
                    In ledger: <span className="bitcoinColor">&#8383;</span>
                    {globalLoading ? 0 : user.playerStats.ledger}
                  </CardText>
                  <Select
                    className="text-dark"
                    value={ledgerState.selectedOption}
                    onChange={handleChange}
                    options={ledgerState.loading ? "" : ledgerState.users}
                  />

                  <InputGroup className="my-2">
                    <InputGroupAddon addonType="prepend">
                      &#8383;
                    </InputGroupAddon>
                    <Input
                      type="number"
                      min={0}
                      step="1000"
                      placeholder="Amount"
                      value={ledgerState.transferAmount}
                      onChange={handleTransferAmountChange}
                    />
                  </InputGroup>
                  <Button
                    color="outline-light"
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
    </div>
  );
};

export default Ledger;
