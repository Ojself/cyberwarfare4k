import React from "react";
import PropTypes from "prop-types";

import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const AllianceCard = props => {
  const { title, image, name } = props;
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h3">{title || "Title"}</CardTitle>
          <CardImg top width="100%" src={image || ""} alt={name || "Hacker"} />
          <CardSubtitle>{name || "Hacker"}</CardSubtitle>
        </CardBody>
      </Card>
    </div>
  );
};

AllianceCard.PropTypes = {
  title: PropTypes.String.isRequired,
  image: PropTypes.String.isRequired,
  name: PropTypes.String.isRequired
};

export default AllianceCard;
