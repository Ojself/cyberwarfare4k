import React, { useState, useEffect } from "react";
import api from "../../../api";
import { Row, Col, Container } from "reactstrap";
import Itemtable from "./ItemTable";

import Tutorial from "../_molecules/Tutorial";

const MarketPlace = ({ user, updateGlobalValues }) => {
  const [marketPlaceState, setMarketPlaceState] = useState({
    items: [],
    loading: true,
  });

  useEffect(() => {
    const fetchMarketPlaceItems = async () => {
      const data = await api.getMarketPlaceItems();
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
    <Container>
      <Row>
        <Col>
          <Itemtable
            userItem={user.marketPlaceItems["Firewall"]}
            handlePurchase={handleMarketPlaceItemPurchase}
            items={marketPlaceState.items.filter(
              (avilableItem) => avilableItem.type === "Firewall"
            )}
          />
        </Col>
        <Col>
          <Itemtable
            userItem={user.marketPlaceItems["CPU"]}
            handlePurchase={handleMarketPlaceItemPurchase}
            items={marketPlaceState.items.filter(
              (avilableItem) => avilableItem.type === "CPU"
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Itemtable
            userItem={user.marketPlaceItems["Encryption"]}
            handlePurchase={handleMarketPlaceItemPurchase}
            items={marketPlaceState.items.filter(
              (avilableItem) => avilableItem.type === "Encryption"
            )}
          />
        </Col>
        <Col>
          <Itemtable
            userItem={user.marketPlaceItems["AntiVirus"]}
            handlePurchase={handleMarketPlaceItemPurchase}
            items={marketPlaceState.items.filter(
              (avilableItem) => avilableItem.type === "AntiVirus"
            )}
          />
        </Col>
      </Row>
    </Container>
  );
  return (
    <div>
      <div className="d-flex justify-content-center">
        <h1>Marketplace</h1>
        <Tutorial section="Marketplace" />
      </div>
      {marketPlaceState.loading ? <p>loading..</p> : marketPlaceOverview}
    </div>
  );
};

export default MarketPlace;
