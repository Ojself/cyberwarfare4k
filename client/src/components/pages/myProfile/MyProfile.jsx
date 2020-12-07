import React, { useState } from "react";
import {
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

import ProgressBarCrimeSkill from "./molecules/ProgressBarCrimeSkill";
import ProgressBarHackSkill from "./molecules/ProgressBarHackSkill";
import ProgressBarFirewallSkill from "./molecules/ProgressBarFirewallSkill";
import ProgressBarExp from "./molecules/ProgressBarExp";

import { getCorrectAllianceRoleName } from "../_helpers";
import SubscriptionIcon from "../_molecules/SubscriptionIcon"

import api from "../../../api";
import classnames from "classnames";



const MyProfile = ({ globalLoading, user, updateGlobalValues }) => {
  console.log(user,'user')
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleUpgrade = async (upgradeName) => {
    const result = await api.upgradeStats(upgradeName);
    updateGlobalValues(result);
  };

  const getStashColor = (index) => {
    // todo. color should be consistent
    // extract to helper
    const defaultColors = ["red", "blue", "orange", "green"];
    return defaultColors[index % defaultColors.length];
  };

  const getMarketPlaceItemValue = (type, value) => {
    if (
      globalLoading ||
      !user.marketPlaceItems[type] ||
      !user.marketPlaceItems[type][value]
    ) {
      return 0;
    }
    return user.marketPlaceItems[type][value];
  };

  const getCurrency = (name) => {
    if (!user || !user.currencies[name]) {
      return "0";
    }
    return user.currencies[name];
  };
  const profileAvatars = !globalLoading && (
    <div className="d-flex justify-content-center mb-2">
      {/* <div >
            <img
              style={{ maxWidth: "200px", width: "65%" }}
              src={
                user.alliance &&
                user.alliance.name
                  ? `/alliancePics/${user.alliance.name}.png`
                  : ""
              }
              alt={"Alliance"}
              title="Alliance"
            />
        </div> */}
      <div>
        <img
          style={{ maxWidth: "120px", width: "100%", borderRadius: "50%" }}
          src={user.account.avatar}
          alt="hackerPic"
          title="This is you!"
        />
      </div>
    </div>
  );

  const profileSkills = !globalLoading && (
    <div className="d-flex flex-column col-4">
      {["Technical", "Forensics", "Social Engineering", "Cryptography"].map(
        (c) => {
          return (
            <ProgressBarCrimeSkill
              color="success"
              upgrade={(e) => handleUpgrade(e)}
              key={c}
              name={c}
              value={user.crimeSkill[c]}
              max={200}
              hasStatPoints={!!user.playerStats.statPoints}
            />
          );
        }
      )}
      <div className="my-4"></div>
      {["CPU", "AntiVirus", "Encryption"].map((h) => {
        return (
          <ProgressBarHackSkill
            color="primary"
            key={h}
            upgrade={(e) => handleUpgrade(e)}
            name={h}
            value={user.hackSkill[h]}
            hasStatPoints={!!user.playerStats.statPoints}
            bonus={getMarketPlaceItemValue(h, "bonus")}
          />
        );
      })}
      <div className="my-4"></div>
      <ProgressBarExp
        color="warning"
        upgrade={(e) => handleUpgrade(e)}
        name={"exp"}
        value={user.playerStats.exp}
        max={user.playerStats.expToLevel}
        hasStatPoints={!!user.playerStats.statPoints}
      />

      <ProgressBarFirewallSkill
        upgrade={(e) => handleUpgrade(e)}
        name="Firewall"
        value={user.playerStats.currentFirewall}
        max={user.playerStats.maxFirewall}
        hasStatPoints={!!user.playerStats.statPoints}
      />
    </div>
  );

  const profileRankOverview = !globalLoading && (
    <div className="col-4">
      <ul className="list-group">
        <li className="list-group-item bg-dark mb-2">
          <SubscriptionIcon subscription={user.account.subscription} />
          {user.playerStats.rankName}
        </li>
        {user.alliance && (
          <li className="list-group-item bg-dark mb-2">
            {getCorrectAllianceRoleName(user.allianceRole)}
          </li>
        )}
        <li className="list-group-item bg-dark mb-2">
          Networth: <span style={{ color: "#F08F18" }}>&#8383; </span>
          {user.playerStats.bitCoins + user.playerStats.ledger}
        </li>
        <li className="list-group-item bg-dark mb-2">
          Attacks initiated: {user.fightInformation.attacksInitiated}
        </li>
        <li className="list-group-item bg-dark mb-2">
          Attacks received: {user.fightInformation.attacksVictim}
        </li>
        <li className="list-group-item bg-dark mb-2">
          Shutdowns: {user.fightInformation.shutdowns}
        </li>
        <li className="list-group-item bg-dark mb-2">
          Bounty: <span style={{ color: "#F08F18" }}>&#8383; </span>
          {user.playerStats.bounty}
        </li>
        {/* todo clickable with bounty donor? module */}
        <li className="list-group-item bg-dark mb-2">
          Available Statpoints: {user.playerStats.statPoints}
        </li>
      </ul>
    </div>
  );

  const profileBelongings = (
    <div className="col-4">
      <div>
        <Nav tabs>
          {["Items", "Currencies", "Stash"].map((t, i) => {
            return (
              <NavItem key={i}>
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
                        {getMarketPlaceItemValue("AntiVirus", "name") || "none"}
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
                        {getMarketPlaceItemValue("Firewall", "name") || "none"}
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
                  {!globalLoading &&
                    Object.keys(user.stash).map((s, i) => (
                      <div key={i}>
                        <img
                          style={{ maxWidth: "75px", width: "100%" }}
                          src={`/stashPics/${s}/${getStashColor(i)}.png`}
                          title={s}
                          alt={s}
                        />

                        <p>{user.stash[s]}</p>
                      </div>
                    ))}
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );

  const profileHeader = !globalLoading && (
    <div>
      {user.playerStats.statPoints ? (
        <div>
          <h1 className="text-warning display-3">UPGRADES AVAILABLE!</h1>
          <p>Upgrade your desired skill by clicking it</p>
        </div>
      ) : (
        <h3>{user.name}</h3>
      )}
    </div>
  );

  const profilePage = (
    <div className="container d-flex flex-column">
      {profileHeader}
      {profileAvatars}
      <div className="d-flex">
        {profileSkills}
        {profileRankOverview}
        {profileBelongings}
      </div>
    </div>
  );

  return (
    <div className="mt-5">{globalLoading ? <p>loading..</p> : profilePage}</div>
  );
};

export default MyProfile;
