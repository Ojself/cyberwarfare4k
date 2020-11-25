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

import api from "../../api";

const HackerProfile = ({ history, match, updateGlobalValues }) => {
  const [opponentState, setOpponentState] = useState({
    opponent: null,
    ranking: null,
    loading: true,
    bountyInput: 0,
  });
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

  const handleClick = () => {
    const opponentId = opponentState.opponent._id;
    history.push(`/messages/to=${opponentId}`);
  };

  const handleAttack = async () => {
    const opponentId = opponentState.opponent._id;
    let data;
    try {
      data = await api.attackOpponent(opponentId);
    } catch (err) {
      console.log("error", err);
      updateGlobalValues(err);
      return;
    }
    console.log("data", data);
    updateGlobalValues(data);
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
          <img
            style={{ maxWidth: "200px", width: "65%" }}
            src={`/alliancePics/${opponentState.opponent.alliance.name}.png`}
            alt="hackerPic"
          />
        </div>
      )}
    </div>
  );
  const opponentGlobalRanking = !opponentState.loading && (
    <div className="col-3 ">
      <ListGroup className="text-left">
        <ListGroupItem className="justify-content-between bg-dark text-center">
          <strong>
            {opponentState.opponent.name}'s{" "}
            <span style={{ color: "#FFCC00" }}>global ranking</span>
          </strong>
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge color="primary" pill>
            #{opponentState.ranking.crimeSkill}
          </Badge>{" "}
          Crime skills
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge color="success" pill>
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
    <div className="col-3 d-flex flex-column justify-content-between">
      <ListGroup className="text-center">
        <ListGroupItem className="justify-content-between bg-dark">
          {" "}
          {opponentState.opponent.playerStats.rankName}{" "}
        </ListGroupItem>

        {opponentState.ranking.online ? (
          <ListGroupItem className="justify-content-between bg-dark terminalTextGreen">
            {" "}
            Online{" "}
          </ListGroupItem>
        ) : (
          <ListGroupItem className="justify-content-between bg-dark terminalTextLost">
            {" "}
            Offline{" "}
          </ListGroupItem>
        )}
      </ListGroup>

      <div className="d-flex flex-column">
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
    <div className="d-flex flex-column justify-content-between col-3">
      <div className="d-flex justify-content-around">
        <Button color="outline-info" onClick={() => handleClick()}>
          Message
        </Button>
        <Button onClick={() => handleAttack()} color="outline-danger">
          Attack
        </Button>
      </div>
    </div>
  );

  const profilePage = (
    <div className="container">
      {avatarImages}
      {playerName}
      <div className="d-flex justify-content-around">
        {opponentGlobalRanking}
        {opponentOverview}
        {opponentActions}
      </div>
    </div>
  );

  return <div>{opponentState.loading ? <p>loading..</p> : profilePage}</div>;
};

export default HackerProfile;
