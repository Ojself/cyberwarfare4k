import React, { useState } from "react";

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

import infoCollection from "./infoCollection.jsx";
const SITEMAP = () => {
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
            <CardTitle tag="h3">{infoCollection["My Profile"].title}</CardTitle>
            {infoCollection["My Profile"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Top Hackers"].title}
            </CardTitle>
            {infoCollection["Top Hackers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Wanted Hackers"].title}
            </CardTitle>
            {infoCollection["Wanted Hackers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Information & FAQ"].title}
            </CardTitle>
            {infoCollection["Information & FAQ"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Earn Battery"].title}
            </CardTitle>
            {infoCollection["Earn Battery"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Token Store"].title}
            </CardTitle>
            {infoCollection["Token Store"].text}
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
            <CardTitle tag="h3">
              {infoCollection["Public Forum"].title}
            </CardTitle>
            {infoCollection["Public Forum"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Messages"].title}</CardTitle>
            {infoCollection["Messages"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Notifications"].title}
            </CardTitle>
            {infoCollection["Notifications"].text}
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
            <CardTitle tag="h3">
              {infoCollection["Top Alliances"].title}
            </CardTitle>
            {infoCollection["Top Alliances"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Create"].title}</CardTitle>
            {infoCollection["Create"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Alliance Forum"].title}
            </CardTitle>
            {infoCollection["Alliance Forum"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Dashboard"].title}</CardTitle>
            {infoCollection["Dashboard"].text}
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
            <CardTitle tag="h3">
              {infoCollection["Local Hackers"].title}
            </CardTitle>
            {infoCollection["Local Hackers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Service & Support"].title}
            </CardTitle>
            {infoCollection["Service & Support"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["VPN"].title}</CardTitle>
            {infoCollection["VPN"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Crypto Currency"].title}
            </CardTitle>
            {infoCollection["Crypto Currency"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Marketplace"].title}
            </CardTitle>
            {infoCollection["Marketplace"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Funeral"].title}</CardTitle>
            {infoCollection["Funeral"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Fence"].title}</CardTitle>
            {infoCollection["Fence"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Ledger"].title}</CardTitle>
            {infoCollection["Ledger"].text}
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
            <CardTitle tag="h3">{infoCollection["Petty"].title}</CardTitle>
            {infoCollection["Petty"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Crimes"].title}</CardTitle>
            {infoCollection["Crimes"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Data Centers"].title}
            </CardTitle>
            {infoCollection["Data Centers"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Organized Crimes"].title}
            </CardTitle>
            {infoCollection["Organized Crimes"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Espionage"].title}</CardTitle>
            {infoCollection["Espionage"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Hack players"].title}
            </CardTitle>
            {infoCollection["Hack players"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  return (
    <div>
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

export default SITEMAP;
