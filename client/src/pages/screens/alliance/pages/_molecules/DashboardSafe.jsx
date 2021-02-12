import React from "react";
import {
  Container,
  Col,
  Row,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
} from "reactstrap";

const DashboardSafe = ({
  loading,
  alliance,
  withdrawAmount,
  handleWithdrawAmountChange,
  withdrawFromSafe,
  handleTaxChange,
  taxAmount,
  saveNewTax,
  homeCity,
}) => {
  return !loading ? (
    <Container className="mt-5 ">
      <Row>
        <Col>
          <p>City tax ({homeCity.name})</p>
          <InputGroup>
            <InputGroupAddon addonType="prepend">%</InputGroupAddon>
            <Input
              type="number"
              min={0}
              max={100}
              step="1"
              placeholder={homeCity.allianceFee * 100 || "Percentage"}
              value={taxAmount}
              onChange={handleTaxChange}
            />
          </InputGroup>
          <Button
            type="submit"
            className="w-75 my-2 mx-auto"
            color="outline-success"
            onClick={saveNewTax}
          >
            Save
          </Button>
        </Col>
        <Col>
          <p>Safe: {alliance.safe}</p>
          <InputGroup>
            <InputGroupAddon addonType="prepend">&#8383;</InputGroupAddon>
            <Input
              type="number"
              min={0}
              step="1000"
              placeholder="Amount"
              value={withdrawAmount}
              onChange={handleWithdrawAmountChange}
            />
          </InputGroup>
          <Button
            type="submit"
            className="w-75 my-2 mx-auto"
            color="outline-light"
            onClick={withdrawFromSafe}
          >
            Withdraw
          </Button>
        </Col>
      </Row>
    </Container>
  ) : (
    <p>Loading</p>
  );
};

export default DashboardSafe;
