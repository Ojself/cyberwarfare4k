import React from "react";

import { Table, Button } from "reactstrap";

const itemColors = {
  CPU: "info",
  Encryption: "primary",
  Firewall: "danger",
  AntiVirus: "secondary",
};

const ItemTable = ({ userItem, items, handlePurchase }) => {
  const itemsTable = (
    <>
      <h4 className={`text-${itemColors[items[0].type]}`}>{items[0].type}</h4>
      <Table style={{ minWidth: "40vw", marginBottom: "5vh" }} dark>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Bonus</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const userHasItem = userItem
              ? (userItem._id || userItem) === item._id
              : null;
            return (
              <tr key={item._id}>
                <th scope="row">{item.name}</th>
                <td>{item.price}</td>
                <td>+{item.bonus}</td>
                <td>
                  <Button
                    disabled={userHasItem}
                    color={itemColors[item.type]}
                    name={item._id}
                    onClick={(e) => handlePurchase(e)}
                  >
                    BUY
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );

  return <div>{itemsTable}</div>;
};

export default ItemTable;
