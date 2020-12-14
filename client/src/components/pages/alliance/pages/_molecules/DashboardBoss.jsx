import React from 'react'
import {
  Button
} from "reactstrap";

const DashboardBoss = () => {
    return (
      <div>
        <p> Work in progress </p>
        {/* <h4> Here's secret options</h4>
            <p> Set vault password ✅ ❌</p>
            <p> Give organize permission </p>
            <p> Dissolve family</p> */}
        <Button disabled={true} color="danger">Disolve family</Button>
      </div>
    );
}

export default DashboardBoss
