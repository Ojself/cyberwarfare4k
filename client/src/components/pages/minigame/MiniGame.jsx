import React, { useState, useEffect } from "react";
import Row from "./molecules/Row";

// import api from "../../api";

const MiniGame = () => {
  const [gameState, setGameState] = useState({
    prize: null,
    activeRowIndex: 0,
    rows: [
      {
        name: "top",
        index: 0,
        value: 0,
        endValue: 0,
        speed: 200,
        isRunning: true,
        //key: Math.random(),
        direction: "ltr"
      },
      {
        name: "center",
        value: 0,
        index: 1,
        endValue: 0,
        speed: 200,
        isRunning: true,
        //key: Math.random(),
        direction: "rtl"
      },
      {
        name: "bottom",
        value: 0,
        index: 2,
        endValue: 0,
        speed: 200,
        isRunning: true,
        //key: Math.random(),
        direction: "ltr"
      }
    ]
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  const handleKeyPress = () => {
    // which row will be stopped if keypress [0,1,2]
    const index = gameState.activeRowIndex;
    // If keypress occurs while a row is active
    if (index < gameState.rows.length) {
      //Cancel the row's timer and stop it
      cancelInterval(index);
      //And set the value it ended on
      setEndValue(index, gameState.rows[index].value);
      determinePrize();
    }
    // Update the active row index every keypress
    updateActiveRow();
  };

  const updateActiveRow = () => {
    //Sets the active row to +=1 or resets it
    if (gameState.activeRowIndex < gameState.rows.length) {
      const index = (gameState.activeRowIndex += 1);
      setGameState({ ...gameState, activeRowIndex: index });
    } else {
      resetGame();
    }
  };

  const determinePrize = () => {
    const rows = gameState.rows;
    const endValues = rows.map(row => {
      return row.endValue;
    });
    let prize = "";
    endValues.forEach((value, index) => {
      if (endValues[index] !== endValues[0]) {
        prize = 3; //code for 'No Prize'
      } else {
        prize = endValues[0];
      }
    });
    setGameState({ ...gameState, prize: prize });
  };

  const resetGame = () => {
    console.log("resetgame");
    const rows = gameState.rows.map(row => {
      //row.key = Math.random();
      //Reset running timer
      row.isRunning = true;
      return row;
    });

    //Set the state
    setGameState({ ...gameState, rows: rows, activeRowIndex: 0 });
  };

  const setRotatingValue = (index, value) => {
    let rows = gameState.rows;
    let row = rows[index];
    row.value = value;
    rows[index] = row;
    setGameState({ ...gameState, rows: rows });
  };

  const setEndValue = (index, value) => {
    let rows = gameState.rows;
    let row = rows[index];
    row.endValue = value;
    rows[index] = row;
    console.log(gameState, "gamestate");
    setGameState({ ...gameState, rows: rows });
  };

  const cancelInterval = index => {
    let rows = gameState.rows;
    let row = rows[index];
    row.isRunning = false;
    rows[index] = row;
    setGameState({ ...gameState, rows: rows });
  };

  const rows = gameState.rows.map(row =>
    <Row
      name={row.name}
      index={row.index}
      data={gameState}
      setEndValue={setEndValue}
      setRotatingValue={setRotatingValue}
      isRunning={row.isRunning}
      speed={row.speed}
      key={row.key}
      direction={row.direction}
    />

  );

  return (
    <div className="gameWrapper">
      <div className="viewport">
        <div className="game">
          <div className="rows">{rows}</div>
        </div>
        {/* <Results
          shown={gameState.activeRowIndex === 3}
          prize={gameState.prize}
        /> */}
      </div>
    </div>
  );
};

export default MiniGame;
