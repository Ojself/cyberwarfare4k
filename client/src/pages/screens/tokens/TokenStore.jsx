import React from "react";
import { Button, Container, Col, Row } from "reactstrap";
import RedeemTokensCard from "../../../components/tokens/RedeemTokenCard";
import api from "../../../api";

import { Link } from "react-router-dom";

const TokenStore = ({ globalLoading, user, updateGlobalValues }) => {
  const handleTokenBuy = async (energyAmount) => {
    let data;
    try {
      data = await api.redeemTokens(energyAmount);
    } catch (err) {
      console.error("err");
      return updateGlobalValues(err);
    }
    console.log(data, "data");
    updateGlobalValues(data);
  };
  const userTokens = (!globalLoading && user.account.tokens) || 0;

  return (
    <div>
      <h1>Redeem Tokens</h1>
      <Container>
        <Row>
          <Col md="3">
            <h3>
              <span role="img" aria-label="tokens">
                &#129689;
              </span>{" "}
              Balance
            </h3>
            <h5>{userTokens} Tokens</h5>
            <Link to="/tokens/buy">
              <Button color="primary" className="w-100 btn-shadow mb-4">
                Buy Tokens
              </Button>
            </Link>

            <Button color="primary" className="w-100 btn-shadow mb-4">
              Transfer Tokens
            </Button>
            <Link to="/earn-battery">
              <Button color="light" className="w-100 btn-shadow mb-4">
                Earn Battery
              </Button>
            </Link>
          </Col>
          <Col md="3">
            <RedeemTokensCard
              img="big"
              title="XXL boost"
              text="Get a truck load of battery."
              energyBoost="144"
              tokenCost="500"
              handleTokenBuy={handleTokenBuy}
            />
          </Col>
          <Col md="3">
            <RedeemTokensCard
              img="medium"
              title="Medium boost"
              text="Get a couple of AA batteries"
              energyBoost="55"
              tokenCost="250"
              handleTokenBuy={handleTokenBuy}
            />
          </Col>
          <Col md="3">
            <RedeemTokensCard
              img="small"
              title="Small boost"
              text="Get a small watch battery"
              energyBoost="10"
              tokenCost="50"
              handleTokenBuy={handleTokenBuy}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TokenStore;
