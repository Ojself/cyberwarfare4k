import React from "react";
import BuyTokensCard from "../../../components/tokens/BuyTokenCard";
import { Container, Col, Row } from "reactstrap";
import api from "../../../api";

const TokenBuy = ({ globalLoading, user, updateGlobalValues }) => {
  const payWithStripe = async (amount) => {
    let data;
    try {
      data = await api.buyTokens(amount, "Stripe");
    } catch (err) {
      console.error("err");
      return updateGlobalValues(err);
    }
    console.log(data, "data");
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
    console.log(data, "data");
    updateGlobalValues(data);
  };
  const userTokens = (!globalLoading && user.account.tokens) || 0;
  return (
    <Container>
      <Row>
        <Col>
          <h1>Token Store</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>
            Current Balance:{" "}
            <span role="img" aria-label="tokens">
              &#129689;
            </span>{" "}
            {userTokens}
          </h3>
        </Col>
      </Row>

      <Row className="mt-5 mb-3">
        <Col md="6">
          <h5>What are tokens?</h5>
          <p>
            Tokens are a virtual currency that allows you to purchase bonus
            items in the game like extra energy.
          </p>
        </Col>
        <Col md="6">
          <h5>How do I use them?</h5>
          <p>
            In the Token Store you can buy various items by clicking the "Redeem
            Tokens" below the item you would like to purchase.
          </p>
        </Col>
      </Row>

      <Row>
        <Col md="4" sm="12">
          <BuyTokensCard
            payWithStripe={payWithStripe}
            payWithVipps={payWithVipps}
            tokensAmount="1000"
            priceInEur="10"
          />
        </Col>
        <Col md="4" sm="12">
          <BuyTokensCard
            payWithStripe={payWithStripe}
            payWithVipps={payWithVipps}
            tokensAmount="2100"
            priceInEur="20"
          />
        </Col>
        <Col md="4" sm="12">
          <BuyTokensCard
            payWithStripe={payWithStripe}
            payWithVipps={payWithVipps}
            tokensAmount="5000"
            priceInEur="40"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TokenBuy;
