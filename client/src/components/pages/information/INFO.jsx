import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import {
  Collapse,
  Button,
  CardBody,
  CardTitle,
  Card,
  Row,
  Col,
  Container,
} from "reactstrap";

import infoJson from "./infoCollection.jsx";
const INFO = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [hackOpen, setHackOpen] = useState(false);
  const [allianceOpen, setAllianceOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  const infoSection = (
    <div>
      <Button
        className="w-75"
        color="primary"
        onClick={() => setInfoOpen(!infoOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Info
      </Button>
      <Collapse isOpen={infoOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["My Profile"].title}</CardTitle>
            {infoJson["My Profile"].text}
            Everything you need to know about yourself is there.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Wanted Hackers"].title}</CardTitle>
            {infoJson["Wanted Hackers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              Top Hackers{infoJson["Wanted Hackers"].title}
            </CardTitle>
            {infoJson["Wanted Hackers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoJson["Earn Battery"].title}
              <span role="img" aria-label="battery">
                &#9889;
              </span>
            </CardTitle>
            {infoJson["Earn Battery"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Information"].title}</CardTitle>
            {infoJson["Information"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const communicationSection = (
    <div>
      <Button
        className="w-75"
        color="primary"
        onClick={() => setCommunicationOpen(!communicationOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Communication
      </Button>
      <Collapse isOpen={communicationOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Public Forum"].title}</CardTitle>A
            {infoJson["Public Forum"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Messages"].title}</CardTitle>
            {infoJson["Messages"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Notifications"].title}</CardTitle>
            {infoJson["Notifications"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const allianceSection = (
    <div>
      <Button
        className="w-75"
        color="primary"
        onClick={() => setAllianceOpen(!allianceOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Alliance
      </Button>
      <Collapse isOpen={allianceOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Top Alliances"].title}</CardTitle>
            {infoJson["Top Alliances"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Create"].title}</CardTitle>
            {infoJson["Create"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Alliance Forum"].title}</CardTitle>
            {infoJson["Alliance Forum"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Dashboard"].title}</CardTitle>
            {infoJson["Dashboard"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const citySection = (
    <div>
      <Button
        className="w-75"
        color="primary"
        onClick={() => setCityOpen(!cityOpen)}
        style={{ marginBottom: "1rem" }}
      >
        City
      </Button>
      <Collapse isOpen={cityOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Local Hackers"].title}</CardTitle>
            {infoJson["Local Hackers"].text}
            <FontAwesomeIcon className="text-warning" icon={faWifi} />
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoJson["Service & Support"].title}
            </CardTitle>
            {infoJson["Service & Support"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["VPN"].title}</CardTitle>
            {infoJson["VPN"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Crypto Currency"].title}</CardTitle>
            {infoJson["Crypto Currency"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Marketplace"].title}</CardTitle>
            {infoJson["Marketplace"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Fence"].title}</CardTitle>
            {infoJson["Fence"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Ledger"].title}</CardTitle>
            {infoJson["Ledger"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const hackSection = (
    <div>
      <Button
        className="w-75"
        color="primary"
        onClick={() => setHackOpen(!hackOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Hack
      </Button>
      <Collapse isOpen={hackOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Petty"].title}</CardTitle>
            {infoJson["Petty"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Crimes"].title}</CardTitle>
            {infoJson["Crimes"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Data Centers"].title}</CardTitle>
            {infoJson["Data Centers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Organized Crimes"].title}</CardTitle>
            {infoJson["Organized Crimes"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Espionage"].title}</CardTitle>
            {infoJson["Espionage"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoJson["Hack players"].title}</CardTitle>
            {infoJson["Hack players"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  return (
    <div className="page-container d-flex flex-column justify-content-center">
      <h1>SITE MAP</h1>
      <Container>
        <Row xs="1" className="d-flex justify-content-center">
          <Col md="8" sm="12">
            {infoSection}
          </Col>
          <Col md="8" sm="12">
            {hackSection}
          </Col>
          <Col md="8" sm="12">
            {allianceSection}
          </Col>
          <Col md="8" sm="12">
            {citySection}
          </Col>
          <Col md="8" sm="12">
            {communicationSection}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default INFO;
