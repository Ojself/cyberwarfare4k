import React from "react";

import { Container, Col, Row } from "reactstrap";
import api from "../../../api";

const TokenBuy = ({ globalLoading, user, updateGlobalValues }) => {
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

      <Row></Row>
    </Container>
  );
};

export default TokenBuy;
