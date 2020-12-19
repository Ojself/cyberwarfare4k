import React, { useState, useEffect } from "react";
import api from "../../../api";

import Itemtable from "./ItemTable";
import Xmas from "../_molecules/Xmas";

const MarketPlace = ({ user, updateGlobalValues }) => {
  const [marketPlaceState, setMarketPlaceState] = useState({
    items: [],
    loading: true,
  });

  useEffect(() => {
    const fetchMarketPlaceItems = async () => {
      const data = await api.getMarketPlaceItems();
      const { items } = data;
      setMarketPlaceState({
        ...marketPlaceState,
        items: data.items,
        loading: false,
      });
    };
    fetchMarketPlaceItems();
  }, []);

  const handleMarketPlaceItemPurchase = async (e) => {
    const itemId = e.target.name;
    let data;
    try {
      data = await api.purchaseMarketPlaceItem({ itemId });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
  };

  const marketPlaceOverview = !marketPlaceState.loading && user && (
    <div className="d-flex justify-content-around row">
      {["CPU", "AntiVirus", "Encryption", "Firewall"].map((item) => (
        <Itemtable
          disabled={item === "Encryption"}
          key={item}
          userItem={user.marketPlaceItems[item]}
          handlePurchase={handleMarketPlaceItemPurchase}
          items={marketPlaceState.items.filter(
            (avilableItem) => avilableItem.type === item
          )}
        />
      ))}
    </div>
  );
  return (
    <div>
      <h1>Marketplace</h1>
      <Xmas
        id={"marketplace"}
        size={"l"}
        updateGlobalValues={updateGlobalValues}
        user={user}
      />
      {marketPlaceState.loading ? <p>loading..</p> : marketPlaceOverview}
    </div>
  );
};

export default MarketPlace;
