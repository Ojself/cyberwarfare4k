import React, { useState } from "react";

import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  TabContent,
  TabPane,
} from "reactstrap";

import Tutorial from "../_molecules/Tutorial";

import MiniDataCenterOverview from "./molecules/MiniDataCenterOverview";
import ProgressBarCrimeSkill from "./molecules/ProgressBarCrimeSkill";
import ProgressBarHackSkill from "./molecules/ProgressBarHackSkill";
import ProgressBarFirewallSkill from "./molecules/ProgressBarFirewallSkill";
import ProgressBarExp from "./molecules/ProgressBarExp";

import { getCorrectAllianceRoleName } from "../_helpers";
import SubscriptionIcon from "../_molecules/SubscriptionIcon";

import api from "../../../api";
import classnames from "classnames";

const MyProfile = ({ globalLoading, user, updateGlobalValues }) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleUpgrade = async (upgradeName) => {
    let data;

    try {
      data = await api.upgradeStats(upgradeName);
    } catch(err) {
      console.err
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);

  };

  const getStashColor = (index) => {
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
  const bodyGuardDots = (bgs) => {
    if (!bgs || !bgs.length) return;
    return bgs
      .sort((a, b) => b - a)
      .map((bg, i) => {
        return (
          <svg
            key={`${bg}${i}`}
            title="bodyguard"
            className="mx-1"
            width="10"
            height="10"
          >
            <circle cx="5" cy="5" r="5" fill={bg > 50 ? "#FF3C5B" : "grey"} />
            <path d="M0, 5 a1,1 0 0,0 10,0" fill="#FF3C5B" />
          </svg>
        );
      });
  };

  const equipWeapon = async (weapon) => {
    let data;
    try {
      data = await api.changeWeapon(weapon);
    } catch (err) {
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
  };

  const profileAvatars = !globalLoading && (
    <div className="d-flex justify-content-center mb-2">
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
    <div className="d-flex flex-column w-100">
      <Tutorial section={"Crime Skills"} />
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
      <Tutorial section={"Hack Skills"} />
      {["CPU", "AntiVirus", "Encryption"].map((h) => {
        return (
          <ProgressBarHackSkill
            color="primary"
            key={h}
            upgrade={(e) => handleUpgrade(e)}
            name={h}
            active={user.fightInformation.equippedWeapon === h}
            value={user.hackSkill[h]}
            hasStatPoints={!!user.playerStats.statPoints}
            bonus={getMarketPlaceItemValue(h, "bonus")}
          />
        );
      })}
      <div className="my-4"></div>
      {/* Empty by design */}
      <Tutorial section={"Experience"} />
      <ProgressBarExp
        color="warning"
        upgrade={(e) => handleUpgrade(e)}
        name={"exp"}
        value={user.playerStats.exp}
        max={user.playerStats.expToLevel}
        hasStatPoints={!!user.playerStats.statPoints}
      />
      <Tutorial section={"Firewall"} />
      <ProgressBarFirewallSkill
        upgrade={(e) => handleUpgrade(e)}
        name="Firewall"
        value={user.playerStats.currentFirewall}
        max={user.playerStats.maxFirewall}
        hasStatPoints={!!user.playerStats.statPoints}
      />
      <div title="Bodyguards" className="d-flex justify-content-center">
        {bodyGuardDots(user.playerStats.bodyguards.alive)}
      </div>
    </div>
  );

  const profileRankOverview = !globalLoading && (
    <div className="w-100">
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
          Networth: <span className="bitcoinColor">&#8383; </span>
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
          Bounty: <span className="bitcoinColor">&#8383; </span>
          {user.playerStats.bounty}
        </li>
        {/* todo clickable with bounty donor? module */}
        <li
          className={`list-group-item bg-dark mb-2 ${
            user.playerStats.statPoints && "font-weight-bold"
          }`}
        >
          Available Statpoints: {user.playerStats.statPoints}
        </li>
      </ul>
    </div>
  );

  const profileBelongings = !globalLoading && user && (
    <div className="w-100">
      <>
        <ButtonGroup className="d-flex">
          {["CPU", "AntiVirus", "Encryption"].map((weapon) => {
            return (
              <Button
                key={weapon}
                className="col-4"
                size="sm"
                color="outline-primary"
                onClick={() => equipWeapon(weapon)}
                active={user.fightInformation.equippedWeapon === weapon}
              >
                {weapon}
              </Button>
            );
          })}
        </ButtonGroup>
        <div className="d-flex flex-row w-100 justify-content-center">
          <p
            style={{ fontSize: "0.7rem" }}
            id=""
            className="text-center text-light mr-1"
          >
            Equiped weapon: {user.fightInformation.equippedWeapon}
          </p>
          <Tutorial topPadding={1} size={"sm"} section={"Equip Weapon"} />
        </div>

        <Nav className="mt-5" tabs>
          {["Items", "Crypto", "Stash", "DC"].map((t, i) => {
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
            <Container>
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
            </Container>
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
                      <td>{getCurrency("Doge")}</td>
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
                  {Object.keys(user.stash).map((s, i) => (
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
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <div className="d-flex row">
                  <MiniDataCenterOverview
                    owner={user._id}
                    updateGlobalValues={updateGlobalValues}
                  />
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </>
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
      <Container>
        <Row className="d-flex">
          <Col md="4">{profileSkills}</Col>
          <Col md="4">{profileRankOverview}</Col>
          <Col md="4">{profileBelongings}</Col>
        </Row>
      </Container>
    </div>
  );

  return (
    <div className="mt-5">{globalLoading ? <p>loading..</p> : profilePage}</div>
  );
};

export default MyProfile;
