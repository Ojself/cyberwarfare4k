import React from "react";

const Podium = ({ title, winners, bitCoins }) => {
  return (
    <div className="w-50">
      <h5 className="text-warning">{title}</h5>
      {winners.map((winner, i) => {
        return (
          <p key={JSON.stringify(winner)}>
            <strong>{i + 1}.</strong> {winner.name} ({winner.amount})
          </p>
        );
      })}
    </div>
  );
};

export default Podium;
