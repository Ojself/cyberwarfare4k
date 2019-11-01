import React, { Component, useState, useEffect } from "react";
import api from "../../api";

import { Table, Button } from "reactstrap";

const MarketPlace = ({}) => {
  const [marketPlaceState, setMarketPlaceState] = useState({
    items: [],
    loading: false,
    message: null
  });

  useEffect(async () => {
    const apiItems = await api.getMarketPlaceItems();
    setMarketPlaceState({
      ...marketPlaceState,
      items: apiItems,
      loading: false
    });
  });

  const handleMarketPlaceItemPurchase = e => {
    const itemId = e.target.name;

    api.purchaseMarketPlaceItem({ itemId }).then(result => {
      console.log(result, "result");
    });
  };

  const itemsTable = (
    <Table dark>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Bonus</th>
        </tr>
      </thead>
      <tbody>
        {marketPlaceState.items.map(item => (
          <tr key={item._id}>
            <th scope="row">{item.name}</th>
            <td>{item.type}</td>
            <td>{item.price}</td>
            <td>{item.bonus}</td>
            <td>
              <Button
                name={item._id}
                onClick={e => handleMarketPlaceItemPurchase(e)}
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
      <h2>Marketplace</h2>
      {marketPlaceState.loading ? <p>a</p> : itemsTable}
    </div>
  );
};

export default MarketPlace;
