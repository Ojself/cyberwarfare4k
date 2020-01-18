import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

const AllianceCard = props => {
  console.log(props);
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h3">{props.tilte || "Title"}</CardTitle>
          <CardImg
            top
            width="100%"
            src={props.image || ""}
            alt={props.name || "Hacker"}
          />
          <CardSubtitle>{props.name || "Hacker"}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};
export default AllianceCard;
