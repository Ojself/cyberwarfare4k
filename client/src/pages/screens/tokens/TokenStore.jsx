import React, { useState } from "react";
import { Button, Container, Col, Row } from "reactstrap";
import RedeemTokensCard from "../../../components/tokens/RedeemTokenCard";
import BuyTokensCard from "../../../components/tokens/BuyTokenCard";
import api from "../../../api";
import Tutorial from "../_molecules/Tutorial";

import { Link } from "react-router-dom";

const TokenStore = ({ globalLoading, user, updateGlobalValues }) => {
  const [tab, setTab] = useState("redeem");
  const handleTokenBuy = async (energyAmount) => {
    let data;
    try {
      data = await api.redeemTokens(energyAmount);
    } catch (err) {
      console.error("err");
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };
  const payWithStripe = async (amount) => {
    let data;
    try {
      data = await api.buyTokens(amount, "Stripe");
    } catch (err) {
      console.error("err");
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };
  const payWithVipps = async (amount) => {
    let data;
    try {
      data = await api.buyTokens(amount, "Vipps");
    } catch (err) {
      console.error("err");
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const userTokens = (!globalLoading && user.account.tokens) || 0;
  const title = tab === "redeem" ? "Redeem Tokens" : "Token Store";

  const buyTokenCards = (
    <>
      <Col md="12" lg="3">
        <BuyTokensCard
          payWithStripe={payWithStripe}
          payWithVipps={payWithVipps}
          tokensAmount="1000"
          priceInEur="10"
        />
      </Col>
      <Col md="12" lg="3">
        <BuyTokensCard
          payWithStripe={payWithStripe}
          payWithVipps={payWithVipps}
          tokensAmount="2100"
          priceInEur="20"
        />
      </Col>
      <Col md="12" lg="3">
        <BuyTokensCard
          payWithStripe={payWithStripe}
          payWithVipps={payWithVipps}
          tokensAmount="5000"
          priceInEur="40"
        />
      </Col>
    </>
  );

  const redeemTokenCards = (
    <>
      <Col md="12" lg="3">
        <RedeemTokensCard
          img="big"
          title="XXL boost"
          text="Get a truck load of battery."
          energyBoost="144"
          tokenCost="500"
          handleTokenBuy={handleTokenBuy}
        />
      </Col>
      <Col md="12" lg="3">
        <RedeemTokensCard
          img="medium"
          title="Medium boost"
          text="Get a couple of AA batteries"
          energyBoost="55"
          tokenCost="250"
          handleTokenBuy={handleTokenBuy}
        />
      </Col>
      <Col md="12" lg="3">
        <RedeemTokensCard
          img="small"
          title="Small boost"
          text="Get a small watch battery"
          energyBoost="10"
          tokenCost="50"
          handleTokenBuy={handleTokenBuy}
        />
      </Col>
    </>
  );

  return (
    <Container style={{ minHeight: "65vh" }}>
      <Row>
        <Col className="d-flex justify-content-center">
          <h1>{title}</h1>
          <Tutorial section="Token Store" />
        </Col>
      </Row>
      <Row>
        <Col md="3">
          <h3>
            <span role="img" aria-label="tokens">
              &#128176;
            </span>{" "}
            Balance
          </h3>
          <h5>{userTokens} Tokens</h5>

          <Button
            onClick={() => setTab("redeem")}
            color="primary"
            className="w-100 btn-shadow mb-4"
          >
            Redeem Tokens
          </Button>
          <Button
            onClick={() => setTab("buy")}
            color="primary"
            className="w-100 btn-shadow mb-4"
          >
            Buy Tokens
          </Button>

          <Button color="primary" className="w-100 btn-shadow mb-4">
            Transfer Tokens
          </Button>
          <Link to="/earn-battery">
            <Button color="light" className="w-100 btn-shadow mb-4">
              Earn Battery
            </Button>
          </Link>
        </Col>
        {tab === "redeem" ? redeemTokenCards : buyTokenCards}
      </Row>
    </Container>
  );
};

export default TokenStore;
