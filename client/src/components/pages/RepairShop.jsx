import React from "react";
import api from "../../api";
import { Button } from "reactstrap";

const RepairShop = ({ user, updateGlobalValues }) => {
  const handlePartial = async () => {
    let data;
    try {
      data = await api.repairPartial();
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
  };

  const handleFull = async () => {
    let data;
    try {
      data = await api.repairFull();
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
  };

  const style = {
    height: "35vh",
  };
  const repairShopContent = user && (
    <div className="content d-flex justify-content-around">
      <div className="d-flex flex-column">
        <img
          style={style}
          src="../../../utilPics/partialrepair.jpg"
          alt="Partial Repari"
        />
        <p className="my-0">
          Heals <span style={{ color: "red" }}>&#9829;</span> 20%
        </p>
        <p>
          <span style={{ color: "#F08F18" }}>&#8383;</span>
          {Math.round((user.playerStats.repairCost * 20) / 100)}
        </p>
        <Button color="success" onClick={() => handlePartial()}>
          Partial repair
        </Button>
      </div>
      <div className="d-flex flex-column">
        <img
          style={style}
          src="../../../utilPics/fullrepair.jpg"
          alt="Partial Repari"
        />
        <p className="my-0">
          Heals <span style={{ color: "red" }}>&#9829;</span> 100%
        </p>
        <p>
          <span style={{ color: "#F08F18" }}>&#8383;</span>
          {Math.round(user.playerStats.repairCost)}
        </p>
        <Button color="success" onClick={() => handleFull()}>
          Full repair
        </Button>
      </div>
    </div>
  );

  return (
    <div className="page-container">
      <h1 className="">System Repair</h1>
      {repairShopContent}
    </div>
  );
};

export default RepairShop;
