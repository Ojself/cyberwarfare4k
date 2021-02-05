import React from "react";
import { Button, InputGroup, Input, InputGroupAddon } from "reactstrap";

const DashboardSafe = ({
  alliance,
  withdrawAmount,
  handleWithdrawAmountChange,
  withdrawFromSafe,
  handleTaxChange,
  taxAmount,
  saveNewTax,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default DashboardSafe;
