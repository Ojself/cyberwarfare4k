import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import HallOfFameBody from "../../../components/hallOfFame/HallOfFameBody";

import data from "./data";

const HallOfFame = ({}) => {
  const [isRoundTwoOpen, setIsRoundTwoOpen] = useState(true);
  const [isRoundOneOpen, setIsRoundOneOpen] = useState(false);

  const toggleRoundTwo = () => setIsRoundTwoOpen(!isRoundTwoOpen);
  const toggleRoundOne = () => setIsRoundOneOpen(!isRoundOneOpen);
  return (
    <div className="d-flex w-100 align-items-center justify-content-center flex-column">
      <h1>Hall Of Fame</h1>
      <Button
        className="w-25"
        color="primary"
        onClick={toggleRoundTwo}
        style={{ marginBottom: "1rem" }}
      >
        Round 2
      </Button>
      <Collapse className="w-100" isOpen={isRoundTwoOpen}>
        <Card>
          <CardBody>{<HallOfFameBody round={2} data={data[0]} />}</CardBody>
        </Card>
      </Collapse>
      <Button
        className="w-25"
        color="primary"
        onClick={toggleRoundOne}
        style={{ marginBottom: "1rem" }}
      >
        Round 1
      </Button>
      <Collapse className="w-100" isOpen={isRoundOneOpen}>
        <Card>
          <CardBody>
            <HallOfFameBody round={1} data={data[1]} />
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
};

export default HallOfFame;
