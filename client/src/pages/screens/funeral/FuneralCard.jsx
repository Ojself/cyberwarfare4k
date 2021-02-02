import React from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardGroup,
  CardSubtitle,
  CardBody,
} from "reactstrap";

import { Link } from "react-router-dom";
import formatDateOfDeath from "./helper";

const FuneralCard = ({ member }) => {
  const alliancePic = member.alliance && (
    <Link className="text-light" to={`/alliance/${member.alliance._id}`}>
      <img
        style={{ maxWidth: "30px", width: "65%" }}
        src={`/alliancePics/${member.alliance.name}.png`}
        alt="hackerPic"
      />
    </Link>
  );
  return (
    <div clasName="">
      <CardGroup className="">
        <Card>
          <CardImg top width="100%" src={member.avatar} alt="Card image cap" />
          <CardBody
            className="d-flex flex-column justify-content-around"
            style={{ height: "20vh" }}
          >
            <CardTitle tag="h5">
              {member.name} {alliancePic}
            </CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {formatDateOfDeath(member.createdAt)}
            </CardSubtitle>
            <Link to={`/funeral/${member._id}`}>
              <Button color="primary">Enter funeral</Button>
            </Link>
          </CardBody>
        </Card>
      </CardGroup>
    </div>
  );
};

export default FuneralCard;
