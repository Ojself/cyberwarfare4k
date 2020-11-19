import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, Badge, Button } from "reactstrap";

import api from "../../api";

const HackerProfile = (props) => {
  const [opponentState, setOpponentState] = useState({
    opponent: null,
    loading: true,
  });
  useEffect(() => {
    const opponentId = props.match.params.id;
    const fetchPlayerData = async (opponentId) => {
      const data = await api.getOpponent(opponentId);
      console.log(data, "data");
      setOpponentState({
        ...opponentState,
        opponent: data.opponent,
        ranking: data.opponentRanking,
        loading: false,
      });
    };
    fetchPlayerData(opponentId);
  }, []);

  const handleClick = (event) => {
    const messageUserId = window.location.pathname.match(/[a-f\d]{24}$/);
    props.history.push(`/messages/to=${messageUserId}`);
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
          <Badge pill>{opponentState.ranking.crimeSkill}</Badge> Crime skills
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge pill>{opponentState.ranking.hackSkill}</Badge> Hack Skills
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge pill>{opponentState.ranking.networth}</Badge> Networth
        </ListGroupItem>
        <ListGroupItem className="justify-content-between bg-dark">
          <Badge pill>{opponentState.ranking.shutdowns}</Badge> Shutdowns
        </ListGroupItem>
      </ListGroup>
    </div>
  );

  const opponentOverview = !opponentState.loading && (
    <div className="col-3">
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
    </div>
  );

  const opponentActions = !opponentState.loading && (
    <div className="d-flex flex-column justify-content-between col-3">
      <div className="d-flex justify-content-around">
        <Button onClick={() => handleClick()}>Message</Button>
        <Button>Attack</Button>
      </div>
      <div className="d-flex flex-column">
        <input type="number" />
        <Button>Add Bounty</Button>
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
