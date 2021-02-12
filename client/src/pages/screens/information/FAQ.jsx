import React, { useState } from "react";
import {
  Collapse,
  Button,
  CardBody,
  CardTitle,
  Card,
  Col,
  Row,
  Container,
} from "reactstrap";
import infoCollection from "./infoCollection";

const FAQ = () => {
  const [statPointOpen, setStatPointOpen] = useState(false);
  const [attackOpen, setAttackOpen] = useState(false);
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [ledgerVaultSafeOpen, setLedgerVaultSafeOpen] = useState(false);

  const statPoints = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setStatPointOpen(!statPointOpen)}
        style={{ marginBottom: "1rem" }}
      >
        What does the different skills mean?
      </Button>
      <Collapse isOpen={statPointOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Crime Skills"].title}
            </CardTitle>
            {infoCollection["Crime Skills"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Hack Skills"].title}
            </CardTitle>
            {infoCollection["Hack Skills"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Firewall"].title}</CardTitle>
            {infoCollection["Firewall"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Experience"].title}</CardTitle>
            {infoCollection["Experience"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const moneyMakingSystem = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setMoneyOpen(!moneyOpen)}
        style={{ marginBottom: "1rem" }}
      >
        How do I earn bitcoins (money)?
      </Button>
      <Collapse isOpen={moneyOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Crimes2"].title}</CardTitle>
            {infoCollection["Crimes2"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Frauds"].title}</CardTitle>
            {infoCollection["Frauds"].text}
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
            <CardTitle tag="h3">
              {infoCollection["Data Centers"].title}
            </CardTitle>
            {infoCollection["Data Centers"].text}
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
      </Collapse>
    </div>
  );

  const earnBatterySystem = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setBatteryOpen(!batteryOpen)}
        style={{ marginBottom: "1rem" }}
      >
        How do I get more battery?
      </Button>
      <Collapse isOpen={batteryOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Github"].title}</CardTitle>
            {infoCollection["Github"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Patreon"].title}</CardTitle>
            {infoCollection["Patreon"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Megarpg"].title}</CardTitle>
            {infoCollection["Megarpg"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Chessathor"].title}</CardTitle>
            {infoCollection["Chessathor"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const combatSystem = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setAttackOpen(!attackOpen)}
        style={{ marginBottom: "1rem" }}
      >
        How do I attack other players?
      </Button>
      <Collapse isOpen={attackOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Frauds"].title}</CardTitle>
            {infoCollection["Frauds"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Attacks"].title}</CardTitle>
            {infoCollection["Attacks"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              {infoCollection["Grace period"].title}
            </CardTitle>
            {infoCollection["Grace period"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const ledgerVaultSafe = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => {
          setLedgerVaultSafeOpen(!ledgerVaultSafeOpen);
        }}
        style={{ marginBottom: "1rem" }}
      >
        What is the difference between Ledger, Vault and Safe?
      </Button>
      <Collapse isOpen={ledgerVaultSafeOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Ledger"].title}</CardTitle>
            {infoCollection["Ledger"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Vault"].title}</CardTitle>
            {infoCollection["Vault"].text}
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">{infoCollection["Safe"].title}</CardTitle>
            {infoCollection["Safe"].text}
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  return (
    <div>
      <h1>FAQ</h1>
      <Container>
        <Row xs="1" className="d-flex justify-content-center">
          <Col md="8" sm="12">
            {statPoints}
          </Col>
          <Col md="8" sm="12">
            {moneyMakingSystem}
          </Col>
          <Col md="8" sm="12">
            {combatSystem}
          </Col>
          <Col md="8" sm="12">
            {earnBatterySystem}
          </Col>
          <Col md="8" sm="12">
            {ledgerVaultSafe}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQ;
