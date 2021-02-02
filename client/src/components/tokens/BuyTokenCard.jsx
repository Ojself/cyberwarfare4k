import React from "react";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

const BuyTokenCard = ({
  tokensAmount,
  priceInEur,
  payWithStripe,
  payWithVipps,
}) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">
          <span role="img" aria-label="tokens">
            &#129689;
          </span>{" "}
          <strong>{tokensAmount} Tokens</strong>
        </CardTitle>
        <CardText>€ {priceInEur}.00</CardText>
        <div className="d-flex flex-column w-100 align-items-center">
          <Button
            className="w-100 mt-5 mb-4"
            style={{ height: "7vh" }}
            color="secondary"
            onClick={() => payWithStripe(tokensAmount)}
          >
            Pay with card
          </Button>
          <Button
            className="w-100 mb-2"
            color="#FF5C24"
            style={{ backgroundColor: "#FF5C24", height: "7vh" }}
            onClick={() => payWithVipps(tokensAmount)}
          >
            <img
              src="../token-store/vipps/no_Rectangular 250px/pay_with_vipps_rect_250_NO.png"
              alt="Betal med Vipps"
            />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default BuyTokenCard;
