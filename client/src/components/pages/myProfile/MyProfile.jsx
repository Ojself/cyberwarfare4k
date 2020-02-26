import React, { useState, useEffect } from "react";
import {
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";

import ProgressBarCrimeSkill from "./molecules/ProgressBarCrimeSkill";
import ProgressBarHackSkill from "./molecules/ProgressBarHackSkill";
import ProgressBarFirewallSkill from "./molecules/ProgressBarFirewallSkill";
import ProgressBarExp from "./molecules/ProgressBarExp";

import api from "../../../api";
import classnames from "classnames";

/* Todo / known bugs */

/* listening to user will cause an infinite api calls */
/* set condition if user does not belong to an alliance */
/* add pictures of stash in stash-tab with correct colors */
/* change or remove placeholder picture */
/* Stat upgrade only listen to to parts of the component. eg, you have to click the progressbar, but not the color itself */

const MyProfile = props => {
  const [myProfileState, setMyProfileState] = useState({
    user: null,
    loading: true,
    message: null
  });
  const [activeTab, setActiveTab] = useState("1");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleUpgrade = upgradeName => {
    api
      .upgradeStats(upgradeName)
      .then(result => {
        setMyProfileState({
          ...myProfileState,
          user: result.updatedUser
        });
      })
      .catch(err => console.warn("err", err));
  };

  const giveMeStashColor = color => {
    const defaultColors = ["red", "blue", "orange", "green"];
    return color
      ? color
      : defaultColors[Math.floor(Math.random() * defaultColors.length)];
  };

  useEffect(() => {
    async function fetchUserData() {
      api.getUser().then(result => {
        console.log(result.user, "jarle");
        setMyProfileState({
          ...myProfileState,
          user: result.user,
          loading: false
        });
      });
    }
    fetchUserData();
  }, []);

  const getMarketPlaceItemValue = (type, value) => {
    // type enum = [CPU,firwall,Encryption,AntiVirus]
    // value enum = [name,type,price,bonus,_id]
    if (
      myProfileState.loading ||
      !myProfileState.user.marketPlaceItems[type] ||
      !myProfileState.user.marketPlaceItems[type][value]
    ) {
      return false;
    }
    return myProfileState.user.marketPlaceItems[type][value];
  };

  const getCurrency = name => {
    // name enum = [Litecoin,Ethereum,Ripple,Monero]
    if (myProfileState.loading || !myProfileState.user.currencies[name]) {
      return "0";
    }
    const result = myProfileState.user.currencies[name];
    return result;
  };

  const profilePlaceHolderAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS4CL6AEUtKQPO1nNCqjLvd7tGL1K_ALxiqO8MbmaA5yQcxymQn";
  const profilePage = myProfileState.loading ? (
    "loading.."
  ) : (
    <div className="row">
      <div className="col p-4">
        {myProfileState.user.playerStats.statPoints ? (
          <div>
            <h2 style={{ color: "#F08F18" }}>UPGRADES AVAILABLE!</h2>
            <p>Upgrade your desired skill by clicking it</p>
          </div>
        ) : (
          <h3>{myProfileState.user.name}</h3>
        )}
      </div>
      <div className="w-100"></div>
      <div className="col w-25 ">
        <div>
          <img
            style={{ maxWidth: "200px", width: "100%" }}
            src={
              myProfileState.loading
                ? profilePlaceHolderAvatar
                : myProfileState.user.account.avatar
            }
            alt="hackerPic"
            title="This is you!"
          />
        </div>
        <div className="mt-4">
          {myProfileState.loading ? (
            <img
              style={{ maxWidth: "200px", width: "100%" }}
              src={
                myProfileState.user.alliance &&
                myProfileState.user.alliance.name
                  ? `/alliancePics/${myProfileState.user.alliance.name}.png`
                  : ""
              }
              alt={"Alliance"}
              title="Alliance"
            />
          ) : (
            <img alt=""></img>
          )}
        </div>
      </div>
      <div className="col w-25 ">
        {["Technical", "Forensics", "Social Engineering", "Cryptography"].map(
          (c, i) => {
            return (
              <ProgressBarCrimeSkill
                color="success"
                upgrade={e => handleUpgrade(e)}
                key={i}
                name={c}
                value={myProfileState.user.crimeSkill[c]}
                max={100}
                hasStatPoints={!!myProfileState.user.playerStats.statPoints}
              />
            );
          }
        )}

        {/* Seperator between crime- and hackprogressbars */}
        <div className={"my-4"}></div>
        {["CPU", "AntiVirus", "Encryption"].map((h, i) => {
          return (
            <div>
              <ProgressBarHackSkill
                upgrade={e => handleUpgrade(e)}
                key={i}
                name={h}
                value={myProfileState.user.hackSkill[h]}
                hasStatPoints={!!myProfileState.user.playerStats.statPoints}
                bonus={getMarketPlaceItemValue(h, "bonus")}
              />
            </div>
          );
        })}

        {/* Seperator between hack- and otherprogressbar */}
        <div className={"my-4"}></div>

        <ProgressBarExp
          color="warning"
          upgrade={e => handleUpgrade(e)}
          name={"exp"}
          value={myProfileState.user.playerStats.exp}
          max={myProfileState.user.playerStats.expToLevel}
          hasStatPoints={!!myProfileState.user.playerStats.statPoints}
        />

        <ProgressBarFirewallSkill
          upgrade={e => handleUpgrade(e)}
          name="Firewall"
          value={myProfileState.user.playerStats.currentFirewall}
          max={myProfileState.user.playerStats.maxFirewall}
          hasStatPoints={!!myProfileState.user.playerStats.statPoints}
        />
      </div>
      <div className="col w-25">
        <ul className="list-group ">
          <li className="list-group-item bg-dark mb-2 ">
            {myProfileState.loading
              ? "Rank"
              : myProfileState.user.playerStats.rankName}
          </li>
          <li className="list-group-item bg-dark mb-2">
            Networth: <span style={{ color: "#F08F18" }}>&#8383; </span>
            {myProfileState.user.playerStats.networth}
          </li>
          <li className="list-group-item bg-dark mb-2">
            Attacks initiated:{" "}
            {myProfileState.user.fightInformation.attacksInitiated}
          </li>
          <li className="list-group-item bg-dark mb-2">
            Attacks received:{" "}
            {myProfileState.user.fightInformation.attacksVictim}
          </li>
          <li className="list-group-item bg-dark mb-2">
            Shutdowns: {myProfileState.user.fightInformation.shutdowns}
          </li>
          <li className="list-group-item bg-dark mb-2">
            Bounty: <span style={{ color: "#F08F18" }}>&#8383; </span>
            {myProfileState.user.playerStats.bounty}
          </li>
          {/* todo clickable with bounty donor? module */}
          <li className="list-group-item bg-dark mb-2">
            Available Statpoints: {myProfileState.user.playerStats.statPoints}
          </li>
        </ul>
      </div>
      <div className="col w-25">
        <div>
          <Nav tabs>
            {["Items", "Currencies", "Stash"].map((t, i) => {
              return (
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === i + 1 + "" })}
                    onClick={() => {
                      toggle(i + 1 + "");
                    }}
                  >
                    {t}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Table responsive className="text-light">
                    <thead>
                      <tr>
                        <th>CPU</th>
                        <th>AVS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {getMarketPlaceItemValue("CPU", "name") || "none"}
                        </td>
                        <td>
                          {getMarketPlaceItemValue("AntiVirus", "name") ||
                            "none"}
                        </td>
                      </tr>
                    </tbody>

                    <thead>
                      <tr>
                        <th>Encryption</th>
                        <th>Firewall</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {getMarketPlaceItemValue("Encryption", "name") ||
                            "none "}
                        </td>
                        <td>
                          {getMarketPlaceItemValue("Firewall", "name") ||
                            "none"}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Table responsive className="text-light">
                    <thead>
                      <tr>
                        <th>LTC</th>
                        <th>ETH</th>
                        <th>XRP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getCurrency("Litecoin")}</td>
                        <td>{getCurrency("Ethereum")}</td>
                        <td>{getCurrency("Ripple")}</td>
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
                        <td>{getCurrency("Monero")}</td>
                        <td>{getCurrency("Zcash")}</td>
                        <td>{getCurrency("Dash")}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <div className="d-flex row">
                    {!myProfileState.loading &&
                      Object.keys(myProfileState.user.stash).map(s => (
                        <div>
                          <img
                            style={{ maxWidth: "75px", width: "100%" }}
                            src={`/stashPics/${s}/${giveMeStashColor()}.png`}
                            title={s}
                            alt={"Stash"}
                          />

                          <p>{myProfileState.user.stash[s]}</p>
                        </div>
                      ))}
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container  mt-5">
      {myProfileState.loading ? <p>loading..</p> : profilePage}
    </div>
  );
};

export default MyProfile;
