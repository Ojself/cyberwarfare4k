import React, { useState, useEffect } from "react";
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Input,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import {Link} from 'react-router-dom'
import SubscriptionIcon from "../_molecules/SubscriptionIcon"
import AttackTerminal from "./AttackTerminal"

import api from "../../../api";

const HackerProfile = ({ history, match, updateGlobalValues }) => {
  const [opponentState, setOpponentState] = useState({
    opponent: null,
    ranking: null,
    loading: true,
    bountyInput: 0,
  });
  const [attackResult, setAttackResult] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const opponentId = match.params.id;
    const fetchPlayerData = async (opponentId) => {
      const data = await api.getOpponent(opponentId);
      setOpponentState({
        ...opponentState,
        opponent: data.opponent,
        ranking: data.opponentRanking,
        loading: false,
      });
    };
    fetchPlayerData(opponentId);
  }, []);

  const handleMessageClick = () => {
    const opponentId = opponentState.opponent._id;
    history.push(`/messages/to=${opponentId}`);
  };

  const handleAttackClick = async () => {
    setAttackResult(null);
    const opponentId = opponentState.opponent._id;
    let data;
    try {
      data = await api.attackOpponent(opponentId);
    } catch (err) {
      console.error("error: ", err);
      updateGlobalValues(err);
      return;
    }
    console.log("data", data);
    updateGlobalValues(data,false);
    setAttackResult(data.finalResult);
    setMessage(data.message)
  };

  const handleFraudClick = async () => {
    const opponentId = opponentState.opponent._id;
    let data;
    try {
      data = await api.fraudOpponent(opponentId);
    } catch (err) {
      console.error("error: ", err);
      updateGlobalValues(err);
      return;
    }
    console.log("data", data);
    updateGlobalValues(data, true);
  };

  const handleBountyChange = (e) => {
    setOpponentState({
      ...opponentState,
      bountyInput: e.target.value,
    });
  };

  const addBounty = async () => {
    const opponentId = opponentState.opponent._id;
    console.log(opponentId, "opponentId");
    let data;
    const { bountyInput } = opponentState;
    try {
      data = await api.addBounty({
        bounty: bountyInput,
        bountyTargetId: opponentId,
      });
    } catch (err) {
      console.log("error:", err);
      return;
    }
    updateGlobalValues(data);
    setOpponentState({
      ...opponentState,
      bountyInput: 0,
    });
  };

  const playerName = !opponentState.loading && (
    <div className="">
      <h3>{opponentState.opponent.name}</h3>
    </div>
  );
  const avatarImages = !opponentState.loading && (
    <div className="d-flex justify-content-center">
      <div>
        <img
          style={{ maxWidth: "120px", width: "100%", borderRadius: "50%" }}
          src={opponentState.opponent.account.avatar}
          alt={opponentState.opponent.account.name}
        />
      </div>
      {opponentState.opponent.alliance && (
        <div>
          <Link
            className="text-light"
            to={`/alliance/${opponentState.opponent.alliance._id}`}
          >
            <img
              style={{ maxWidth: "200px", width: "65%" }}
              src={`/alliancePics/${opponentState.opponent.alliance.name}.png`}
              alt="hackerPic"
            />
          </Link>
        </div>
      )}
    </div>
  );
  const opponentGlobalRanking = !opponentState.loading && (
    <div className="col-2 ">
      <ListGroup className="text-left">
        <ListGroupItem className="justify-content-between bg-dark text-center">
          <strong>
            {opponentState.opponent.name}'s{" "}
            <span style={{ color: "#FFCC00" }}>global ranking</span>
          </strong>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge color="success" pill>
            #{opponentState.ranking.crimeSkill}
          </Badge>{" "}
          Crime skills
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge color="primary" pill>
            #{opponentState.ranking.hackSkill}
          </Badge>{" "}
          Hack Skills
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge color="warning" pill>
            #{opponentState.ranking.networth}
          </Badge>{" "}
          Networth
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge color="info" pill>
            #{opponentState.ranking.shutdowns}
          </Badge>{" "}
          Shutdowns
        </ListGroupItem>
      </ListGroup>
    </div>
  );

  const opponentOverview = !opponentState.loading && (
    <div className="col-3 d-flex flex-column ">
      <ListGroup className="text-center mb-5">
        <ListGroupItem className="justify-content-between bg-dark">
          {" "}
          <SubscriptionIcon subscription={opponentState.opponent.account.subscription} />
          {opponentState.opponent.playerStats.rankName}{" "}
        </ListGroupItem>

        {opponentState.ranking.online ? (
          <ListGroupItem className="justify-content-between bg-dark terminalTextwin">
            {" "}
            Online{" "}
          </ListGroupItem>
        ) : (
          <ListGroupItem className="justify-content-between bg-dark terminalTextlost">
            {" "}
            Offline{" "}
          </ListGroupItem>
        )}
      </ListGroup>

      <div className="d-flex flex-column mt-5">
        <InputGroup>
          <InputGroupAddon addonType="prepend">&#8383;</InputGroupAddon>
          <Input
            type="number"
            value={opponentState.bountyInput}
            onChange={handleBountyChange}
            min={0}
            step="1000"
            placeholder="Amount"
          />
        </InputGroup>
        <Button onClick={addBounty} color="outline-info">
          Add Bounty
        </Button>
      </div>
    </div>
  );

  const opponentActions = !opponentState.loading && (
    <div className="d-flex flex-column col-4">
      <div className="d-flex justify-content-around w-75">
        <Button color="outline-info" onClick={() => handleMessageClick()}>
          Message
        </Button>
        <Button onClick={() => handleFraudClick()} color="outline-warning">
          Fraud{" "}
          <span role="img" aria-label="battery">
            &#9889;
          </span>
          4
        </Button>
        <Button onClick={() => handleAttackClick()} color="outline-danger">
          Attack{" "}
          <span role="img" aria-label="battery">
            &#9889;
          </span>
          6
        </Button>
      </div>
      <AttackTerminal message={message} result={attackResult} />
    </div>
  );

  const profilePage = (
    <div className="">
      {avatarImages}
      {playerName}
      <div className="d-flex justify-content-between mt-5 ">
        <div className="col-2"></div>
        {opponentGlobalRanking}
        {opponentOverview}
        {opponentActions}
      </div>
    </div>
  );

  return <div>{opponentState.loading ? <p>loading..</p> : profilePage}</div>;
};

export default HackerProfile;
