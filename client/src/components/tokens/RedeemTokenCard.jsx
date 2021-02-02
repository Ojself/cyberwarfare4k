import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const ReddemTokenCard = ({
  img,
  title,
  text,
  energyBoost,
  tokenCost,
  handleTokenBuy,
}) => {
  return (
    <div>
      <Card>
        <CardImg
          top
          width="100%"
          src={`../token-store/redeem-pics/${img}.jpg`}
          alt={title}
          style={{ height: "22vh" }}
        />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <span role="img" aria-label="battery">
              &#9889;
            </span>
            {energyBoost} Battery
          </CardSubtitle>
          <CardText>{text}</CardText>
          <Button color="secondary" onClick={() => handleTokenBuy(energyBoost)}>
            Redeem {tokenCost} Tokens
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReddemTokenCard;
