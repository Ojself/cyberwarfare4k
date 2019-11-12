import React, { useState, useEffect } from "react";
import api from "../../api";

const PlayerProfile = props => {
  const [opponentState, setOpponentState] = useState({
    opponent: null,
    loading: true
  });
  useEffect(() => {
    const opponentId = props.match.params.id;
    async function fetchPlayerData(opponentId) {
      api.getOpponent(opponentId).then(result => {
        console.log(result, "resault");
        setOpponentState({
          ...opponentState,
          opponent: result.opponent,
          loading: false
        });
      });
    }
    fetchPlayerData(opponentId);
  }, [console.log(opponentState.opponent)]);

  const profilePage = (
    <div className="playerWrapper">
      <div className="playerNameWrapper">
        <h3>
          {opponentState.loading ? "Player Name" : opponentState.opponent.name}
        </h3>
      </div>
      <div className="playerInfoWrapper">
        <div className="playerAvatarWrapper">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4CL6AEUtKQPO1nNCqjLvd7tGL1K_ALxiqO8MbmaA5yQcxymQn"
              alt="hackerPic"
            />
          </div>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIEOjHCXPvlpCeMu_nAj7MblPVHPZVUVCihYq5OF8GrYWPvVNv"
              alt=""
            />
          </div>
        </div>
        <div className="playerStatsWrapper">
          <ul>
            <li>
              {opponentState.loading
                ? "Rank"
                : opponentState.opponent.playerStats.rankName}
            </li>
            <li>
              Networth <span style={{ color: "#F08F18" }}>&#8383;</span>
              {opponentState.loading
                ? "0"
                : opponentState.opponent.playerStats.networth}
            </li>
          </ul>
        </div>
        <div className="playerActionWrapper">
          <div className="playerActionButton">
            <button>Message</button>
          </div>
          <div className="playerActionButton">
            <input type="number" />
            <button>Add Bounty</button>
          </div>
          <div className="playerActionButton">
            <button>Attack</button>
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{opponentState.loading ? <p>loading..</p> : profilePage}</div>;
};

export default PlayerProfile;
