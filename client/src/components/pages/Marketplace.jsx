import React, { useState, useEffect } from "react";
import api from "../../api";

import { Table, Button } from "reactstrap";

const MarketPlace = props => {
  const [marketPlaceState, setMarketPlaceState] = useState({
    loading: false,
    items: [],
    message: null
  });

  useEffect(() => {
    api.getMarketPlaceItems().then(result => {
      const { items } = result;
      console.log("result", items);
      setMarketPlaceState({
        ...marketPlaceState,
        items: result.items,
        loading: false
      });
    });
  }, []);

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
      {marketPlaceState.loading ? <p>loading..</p> : itemsTable}
    </div>
  );
};

export default MarketPlace;
