import React, { useState, useEffect } from "react";
import api from "../../../api";
import { Button, Form, FormGroup, Input, Table } from "reactstrap";
import Xmas from "../_molecules/Xmas";

const MAX_ALLOWED_STASH = 50

const getMaxBuyingVolume = (user, stashes,cityMultiplier)=>{
  const copiedStashes = JSON.parse(JSON.stringify(stashes))
  let wallet = user.playerStats.bitCoins
  const max = copiedStashes
    .map((stash) => {
      stash.price = stash.price * cityMultiplier;
      return stash;
    })
    .sort((a, b) => b.price - a.price)
    .map((stash) => {
      const { name, price } = stash;
      const amountHeldByUser = user.stash[name];
      const userHasTooMuchStash = MAX_ALLOWED_STASH - amountHeldByUser <= 0;

      let amountCanBuy = Math.floor(wallet / price);
      if (amountCanBuy > 50) {
        amountCanBuy = 50;
      }
      amountCanBuy -= amountHeldByUser;

      if (userHasTooMuchStash || wallet < price || amountCanBuy <= 0) {
        return { [name]: 0 };
      }
      wallet -= amountCanBuy * price;
      return { [name]: amountCanBuy };
    });
  return Object.assign({}, ...max);
}

const objectIsEmpty = (obj) => {
  return Object.values(obj).every(val=> val === 0)
}

export const Fence = ({ globalLoading, user, updateGlobalValues }) => {
  const [shopStash, setShopStash] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const [transactionState, setTransactionState] = useState({
    "Cables": 0,
    "Computer": 0,
    "EyeSpy Digital Spy Recorder": 0,
    "HackRf One": 0,
    "Keylogger": 0,
    "Linux for dummies": 0,
    "Lock pick set": 0,
    "Magspoof": 0,
    "Mini Hidden Camera": 0,
    "Proxmark3 Kit": 0,
    "Raspberry Pi": 0,
    "Rubber Ducky": 0,
    "Ubertooth One": 0,
    "WiFi Pineapple": 0,
  })


  const getStashColor = (index) => {
    // todo. color should be consistent
    // extract to helper
    const defaultColors = ["red", "blue", "orange", "green"];
      return defaultColors[index % defaultColors.length];
  };
  

  const handleTransactionChange = (event)=> {
    setShowGift(true)
    setTransactionState({
      ...transactionState,
      [event.target.name]: event.target.value
    })
  }

  const handleSell = async () => {
    if (objectIsEmpty(transactionState))return
    let data;
    try {
      data = await api.sellStashes(transactionState);
    } catch (err) {
      console.error('error',err);
      updateGlobalValues(err,true,true);
      return;
    }
    
    updateGlobalValues(data, true, true);
    resetTransactionState();
  };

  const handleBuy = async ()=> {
    if (objectIsEmpty(transactionState)) return;
    let data
    try {
      data = await api.buyStashes(transactionState);
    }catch (err){
      updateGlobalValues(err)
      return
    }
    updateGlobalValues(data);
    resetTransactionState();
  }

  const resetTransactionState = () => {
    setTransactionState({
      Cables: 0,
      Computer: 0,
      "EyeSpy Digital Spy Recorder": 0,
      "HackRf One": 0,
      Keylogger: 0,
      "Linux for dummies": 0,
      "Lock pick set": 0,
      Magspoof: 0,
      "Mini Hidden Camera": 0,
      "Proxmark3 Kit": 0,
      "Raspberry Pi": 0,
      "Rubber Ducky": 0,
      "Ubertooth One": 0,
      "WiFi Pineapple": 0,
    });
  }
  useEffect(() => {
    const getStashes = async () => {
      let data;
      try {
        data = await api.getStashes();
      } catch (err) {
        console.error(err, "err");
        updateGlobalValues(err);
        return;
      }

      setShopStash(data.stashes);

      setLoading(false);
      updateGlobalValues(data);
    };
    getStashes();
  }, []);
  const city = globalLoading ? "" : user.playerStats.city.name;

  const tableBody =
    !loading &&
    !globalLoading &&
    shopStash.map((stash, i) => {
      const { name, price } = stash;
      const { stashPriceMultiplier } = user.playerStats.city;
      const userStashAmount = user.stash[name];

      return (
        <tr key={name}>
          <td className="d-flex">
            <img
              style={{ maxWidth: "30px", width: "100%" }}
              src={`/stashPics/${name}/${getStashColor(i)}.png`}
              title={name}
              alt={name}
            />
            <div className="m-auto">{name}</div>
          </td>
          <td>{userStashAmount ? userStashAmount : "--"}</td>
          <td>
            <span style={{ color: "#F08F18" }}>&#8383;</span>
            {(price * stashPriceMultiplier).toFixed(2)}
          </td>
          <td>
            <Form>
              <FormGroup className="mb-0">
                <Input
                  onChange={(e) => {
                    handleTransactionChange(e);
                  }}
                  type="number"
                  value={transactionState[name]}
                  min={0}
                  step={1}
                  name={name}
                />
              </FormGroup>
            </Form>
          </td>
        </tr>
      );
    });

  const buttonGroup = (
    <tr className="" style={{ height:"10vh", backgroundColor: "#696b78" }}>
      <td style={{verticalAlign: "middle"}}>
        <Button
          onClick={() => setTransactionState(user.stash)}
          color="outline-danger"
        >
          Sell all
        </Button>{" "}
      </td>
      <td style={{verticalAlign: "middle"}}>
        <Button onClick={()=>handleSell()} color="danger">Sell</Button>{" "}
      </td>
      <td style={{verticalAlign: "middle"}}>
        <Button onClick={()=>handleBuy()} color="success">Buy</Button>{" "}
      </td>
      <td style={{verticalAlign: "middle"}}>
        <Button
          onClick={() =>
            setTransactionState(
              getMaxBuyingVolume(
                user,
                shopStash,
                user.playerStats.city.stashPriceMultiplier
              )
            )
          }
          color="outline-success"
        >
          Max
        </Button>{" "}
      </td>
    </tr>
  );

  const tableOverview = (
    <Table className="w-75" size={"sm"} dark>
      <thead>
        <tr>
          <th>ITEM</th>
          <th>YOU HAVE</th>
          <th>PRICE</th>
          <th>AMOUNT</th>
        </tr>
      </thead>
      <tbody >
        {tableBody}
        {buttonGroup}
      </tbody>
    </Table>
  );
  return (
    <div className="page-container">
      <h1>
        <span className="text-warning">Fence</span> in {city}
      </h1>
      {showGift && (<Xmas
        id={"fence"}
        size={"l"}
        updateGlobalValues={updateGlobalValues}
        user={user}
      />)}
      <div className="content d-flex justify-content-center">
        {tableOverview}
      </div>
    </div>
  );
};

export default Fence;
