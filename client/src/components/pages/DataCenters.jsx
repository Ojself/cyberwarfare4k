import React, { useState, useEffect } from "react";
import api from "../../api";

import { Table, Button } from "reactstrap";

const DataCenter = () => {
  const [dataCenterState, setDataCenterState] = useState({
    dataCenters: [],
    message: null,
    loading: true
  });

  // useEffect(async () => {
  //   /* do api call here to get datacenters */
  //   setDataCenterState({
  //     ...dataCenterState,
  //     dataCenters: result.dataCenters,
  //     loading: false
  //   });
  // }, []);

  const handleDataCenterPurchase = e => {
    const dataCenterName = e.target.name;
    console.log(dataCenterName, "centername");
    api.purchaseDataCenter({ dataCenterName }).then(result => {
      console.log(result, "result purchase");
    });
  };

  const dataCenterTable = (
    <Table dark>
      <thead>
        <tr>
          <th>Name</th>
          {/* Price only available when not owned */}
          <th>Price</th>
          <th>Status</th>
          <th>Required Stash</th>
          <th>Revenue /m</th>
          <th>Purchase / Attack</th>
          {/* <th>Difficulty</th> */}
          <th>Health</th>
          <th>Attacker</th>
          <th>Alliance</th>
        </tr>
      </thead>
      <tbody>
        {dataCenterState.dataCenters.map(dc => (
          <tr key={dc._id}>
            <th scope="row">{dc.name}</th>
            <td>{dc.price}</td>
            <td>{dc.status}</td>
            <tr>
              {/* shouldn't be visible if it's not purchased yet */}
              <td>{dc.requiredStash[0].name}</td>
              <td>{dc.requiredStash[1].name}</td>
              <td>{dc.requiredStash[2].name}</td>
            </tr>
            <td>{dc.minutlyrevenue}</td>
            <td>
              <Button
                name={dc.name}
                onClick={e => this.handleDataCenterPurchase(e)}
              >
                BUY
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div>
      <h2>Wanted list</h2>
      {dataCenterState.loading ? <p>a</p> : dataCenterTable}
    </div>
  );
};

export default DataCenter;
