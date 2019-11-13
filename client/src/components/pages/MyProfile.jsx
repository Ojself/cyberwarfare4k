import React, { useState, useEffect } from "react";
import { Progress, Table } from "reactstrap";
import api from "../../api";

const MyProfile = props => {
  const [myProfileState, setMyProfileState] = useState({
    user: null,
    loading: true
  });
  useEffect(() => {
    async function fetchUserData() {
      api.getUser().then(result => {
        console.log(result, "resault");
        setMyProfileState({
          ...myProfileState,
          user: result.user,
          loading: false
        });
      });
    }
    fetchUserData();
  }, [console.log(myProfileState.user)]);

  const profilePage = myProfileState.loading ? (
    "loading.."
  ) : (
    <div className="row">
      <div className="col">
        <h3>{myProfileState.user.name}</h3>
      </div>
      <div className="w-100">{/* seperator */}</div>
      <div className="col w-25">
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
      <div className="col w-25 ">
        <h5>Crime skills</h5>

        <Progress
          className="mb-3"
          value={myProfileState.user.crimeSkill.Technical}
          max={150}
        >
          Technical
        </Progress>
        <Progress
          className="mb-3"
          value={myProfileState.user.crimeSkill["Social Engineering"]}
          max={150}
        >
          Social Engineering
        </Progress>
        <Progress
          className="mb-3"
          value={myProfileState.user.crimeSkill.Forensics}
          max={150}
        >
          Forensics
        </Progress>
        <Progress
          className="mb-3"
          value={myProfileState.user.crimeSkill.Cryptography}
          max={150}
        >
          Cryptography
        </Progress>

        <h5>Hack Skills</h5>

        <Progress
          className="mb-3 "
          value={myProfileState.user.hackSkill.cpu}
          max={150}
        >
          CPU
        </Progress>
        <Progress
          className="mb-3"
          value={myProfileState.user.hackSkill.antiVirus}
          max={150}
        >
          AntiVirus
        </Progress>
        <Progress
          className="mb-3"
          value={myProfileState.user.hackSkill.encryption}
          max={150}
        >
          Encryption
        </Progress>

        <h5>Exp</h5>

        <Progress
          className="mb-3"
          value={myProfileState.user.playerStats.exp}
          max={myProfileState.user.playerStats.expToLevel}
        >
          {myProfileState.user.playerStats.exp +
            "/" +
            myProfileState.user.playerStats.expToLevel}
        </Progress>
      </div>
      <div className="col w-25">
        <ul className="list-group">
          <li className="list-group-item">
            {myProfileState.loading
              ? "Rank"
              : myProfileState.user.playerStats.rankName}
          </li>
          <li className="list-group-item">
            Networth: <span style={{ color: "#F08F18" }}>&#8383; </span>
            {myProfileState.user.playerStats.networth}
          </li>
          <li className="list-group-item">
            Attacks initiated:{" "}
            {myProfileState.user.fightInformation.attacksInitiated}
          </li>
          <li className="list-group-item">
            Attacks Received:{" "}
            {myProfileState.user.fightInformation.attacksVictim}
          </li>
          <li className="list-group-item">
            Shutdowns: {myProfileState.user.fightInformation.shutdowns}
          </li>
          <li className="list-group-item">
            Bounty: <span style={{ color: "#F08F18" }}>&#8383; </span>
            {myProfileState.user.playerStats.bounty}
          </li>
          {/* todo clickable with bounty donor? module */}
          <li className="list-group-item">
            Available Statpoints:{" "}
            {myProfileState.loading
              ? "0"
              : myProfileState.user.playerStats.statPoints}
          </li>
        </ul>
      </div>
      <div className="col w-25">
        <h5>Items</h5>
        <Table responsive>
          <thead>
            <tr>
              <th>CPU</th>
              <th>AVS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buy?</td>
              <td>Buy?</td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>Firewall</th>
              <th>Encryption</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buy?</td>
              <td>Buy?</td>
            </tr>
          </tbody>
        </Table>

        <h5>Currencies</h5>
        <Table responsive>
          <thead>
            <tr>
              <th>LTC</th>
              <th>ETH</th>
              <th>XRP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {myProfileState.user.currencies.Litecoin
                  ? myProfileState.user.currencies.Litecoin
                  : "Buy?"}
              </td>
              <td>
                {myProfileState.user.currencies.Ethereum
                  ? myProfileState.user.currencies.Ethereum
                  : "Buy?"}
              </td>
              <td>
                {myProfileState.user.currencies.Ripple
                  ? myProfileState.user.currencies.Ripple
                  : "Buy?"}
              </td>
            </tr>
          </tbody>

          <thead>
            <tr>
              <th>XMR</th>
              <th>ZEC</th>
              <th>DASH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {myProfileState.user.currencies.Monero
                  ? myProfileState.user.currencies.Monero
                  : "Buy?"}
              </td>
              <td>
                {myProfileState.user.currencies.Zcash
                  ? myProfileState.user.currencies.Zcash
                  : "Buy?"}
              </td>
              <td>
                {/* <td>
                {myProfileState.user.currencies.Dash
                  ? myProfileState.user.currencies.Dash
                  : "Buy?"}
              </td> */}
                Buy?
              </td>
            </tr>
          </tbody>
        </Table>
        <h5>Stash</h5>
        <h5>Special Weapons</h5>
      </div>
    </div>
  );

  return (
    <div className="container">
      {myProfileState.loading ? <p>loading..</p> : profilePage}
    </div>
  );
};

export default MyProfile;
