import React, { useState, useEffect } from "react";
import api from "../../api";

const Ladder = ({}) => {
  const [ladderState, setLadderState] = useState({
    users: [],
    loading: true
  });

  useEffect(async () => {
    const apiUsers = await api.getAllUsers();
    setLadderState({
      ...ladderState,
      apiUsers,
      loading: false
    });
  }, []);

  return (
    <div>
      <h2>Ladder</h2>
      <div>
        {/* Name, Kills, deaths, revenue, alliance etc */}
        {ladderState.users.map((user, i) => {
          return (
            <div id={i + user} className="ladderNames">
              <p>{user.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ladder;
