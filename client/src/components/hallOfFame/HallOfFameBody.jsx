import React from "react";
import Podium from "./Podium";

const medals = ["🥇", "🥈", "🥉"];

const HallOfFameBody = ({ data, round }) => {
  const {
    winners,
    topAlliances,
    topCrimes,
    topVpns,
    topExp,
    topCryptos,
    topNewComers,
    topBgs,
    topRepairs,
    topShutdowns,
    topAttacks,
  } = data;

  return (
    <div className="page-container">
      <h1>Hall Of Fame</h1>
      <div className="content">
        <h6>Round {round}</h6>
        <div className="my-4">
          <h2 className="text-warning">Winners</h2>
          {winners.map((winner, i) => {
            return (
              <p key={JSON.stringify(winner)}>
                <span role="img" aria-label="subscription-icon">
                  {medals[i]}
                </span>
                <strong>{winner.name}</strong>{" "}
                <span className="bitcoinColor">&#8383;</span>
                {winner.amount}
              </p>
            );
          })}
        </div>
        <div className="my-5 d-flex justify-content-around">
          {topAlliances && (
            <Podium title="Top alliances" winners={topAlliances} />
          )}
          {topCrimes && <Podium title="Most crimes" winners={topCrimes} />}
          {topShutdowns && (
            <Podium title="Most Shutdowns" winners={topShutdowns} />
          )}
        </div>

        <div className="my-5 d-flex justify-content-around">
          {topVpns && <Podium title="Most VPN changes" winners={topVpns} />}
          {topExp && <Podium title="Most experience" winners={topExp} />}
          {topAttacks && <Podium title="Most attacks" winners={topAttacks} />}
        </div>

        <div className="my-5 d-flex justify-content-around">
          {topCryptos && (
            <Podium title="Most crypto purchases" winners={topCryptos} />
          )}
          <div className="w-50">
            <h5 className="text-warning">
              Best Newcomer{" "}
              <span role="img" aria-label="subscription-icon">
                🚀
              </span>
            </h5>
            {topNewComers.map((newComer, i) => {
              return (
                <p key={JSON.stringify(newComer)}>
                  <strong>{i + 1}.</strong> {newComer}
                </p>
              );
            })}
          </div>
        </div>

        <div className="my-5 d-flex justify-content-around">
          {topBgs && (
            <Podium title="Most bodyguards purchases" winners={topBgs} />
          )}
          {topRepairs && (
            <Podium title="Top repair prices" winners={topRepairs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default HallOfFameBody;
