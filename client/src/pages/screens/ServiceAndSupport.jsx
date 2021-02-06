import React from "react";
import api from "../../api";
import {
  Button,
  Row,
  Col,
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardSubtitle,
} from "reactstrap";

import Tutorial from "./_molecules/Tutorial";

const ServiceAndSupport = ({ user, updateGlobalValues }) => {
  const handlePartial = async () => {
    let data;
    try {
      data = await api.repairPartial();
    } catch (err) {
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const handleFull = async () => {
    let data;
    try {
      data = await api.repairFull();
    } catch (err) {
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const handleBodyguard = async () => {
    let data;
    try {
      data = await api.buyBodyguard();
    } catch (err) {
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const handleResetStatPoints = async () => {
    let data;
    try {
      data = await api.resetStatPoints();
    } catch (err) {
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const serviceContent = user && (
    <div className="content d-flex justify-content-around">
      <Container>
        <Row>
          <Col sm="1" md="6" lg="3" className="mt-2">
            <Card>
              <CardImg
                style={{ height: "22vh" }}
                top
                width="100%"
                src="../../../utilPics/partialrepair.jpg"
                alt="Partial Repair"
              />
              <CardBody>
                {/* <CardTitle tag="h5">Card title</CardTitle> */}
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Heals <span style={{ color: "red" }}>&#9829;</span> 20
                </CardSubtitle>
                <CardText>
                  <span className="bitcoinColor">&#8383;</span>
                  {Math.round((user.playerStats.repairCost * 20) / 100)}
                </CardText>
                <Button color="success" onClick={() => handlePartial()}>
                  Partial repair
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="1" md="6" lg="3" className="mt-2">
            <Card>
              <CardImg
                style={{ height: "22vh" }}
                top
                width="100%"
                src="../../../utilPics/fullrepair.jpg"
                alt="Partial Repair"
              />
              <CardBody>
                {/* <CardTitle tag="h5">Card title</CardTitle> */}
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Heals <span style={{ color: "red" }}>&#9829;</span> 100
                </CardSubtitle>
                <CardText>
                  <span className="bitcoinColor">&#8383;</span>

                  {Math.round(user.playerStats.repairCost)}
                </CardText>
                <Button color="success" onClick={() => handleFull()}>
                  Full repair
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="1" md="6" lg="3" className="mt-2">
            <Card>
              <CardImg
                style={{ height: "22vh" }}
                top
                width="100%"
                src="../../../utilPics/bodyguard.png"
                alt="Bodyguard"
              />
              <CardBody>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Hire Bodyguard {user.playerStats.bodyguards.alive.length}/3
                </CardSubtitle>
                <CardText>
                  <span className="bitcoinColor">&#8383;</span>

                  {Math.round(user.playerStats.bodyguards.price)}
                </CardText>
                <Button color="success" onClick={() => handleBodyguard()}>
                  Hire!
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="1" md="6" lg="3"  className="mt-2">
            <Card>
              <CardImg
                style={{ height: "22vh" }}
                top
                width="100%"
                src="../../../utilPics/resetStats.jpg"
                alt="Reset stats"
              />
              <CardBody>
                {/* <CardTitle tag="h5">Card title</CardTitle> */}
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Reset stats
                </CardSubtitle>
                <CardText>
                  <span className="bitcoinColor">&#8383;</span>
                  {user.playerStats.statPointResetPrice}
                </CardText>
                <Button color="success" onClick={() => handleResetStatPoints()}>
                  Reset!
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <div className="page-container">
      <div className="d-flex justify-content-center">
        <h1>Service & Support</h1>
        <Tutorial section={"Service & Support"} />
      </div>
      {serviceContent}
    </div>
  );
};

export default ServiceAndSupport;
