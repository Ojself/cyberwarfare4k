import React from "react";
/* import {Button, Input} from 'reactstrap' */

const DashboardSafe = ({ alliance }) => {
  return (
    <div>
      {/* <h4> Here's the safe</h4>
        <p> passowrd</p>
        <p> When closed, deposit</p>
        <p> When open, withdraw</p>
        <p>
          {" "}
          To prevent bruteforce attacks, the safe have 3-5 second delay when
          opening
        </p> */}
      <p>Work in progress</p>
      <p>Safe: {alliance.safe}</p>
      {/* <Input placeholder={"password"} />
        <Button color="outline-success">Open</Button>
        
          <Button color="outline-light">Depost</Button>
          <Button color="outline-light"> Withdraw </Button>
         */}
    </div>
  );
};

export default DashboardSafe;
