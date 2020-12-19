import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Button, CardBody, CardTitle, Card } from "reactstrap";
import Xmas from "../_molecules/Xmas"
import FAQ from "./FAQ"

const Information = ({ updateGlobalValues ,user}) => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [hackOpen, setHackOpen] = useState(false);
  const [allianceOpen, setAllianceOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  const infoSection = (
    <div>
      <Button
        className="w-50"
        color="primary"
        onClick={() => setInfoOpen(!infoOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Info
      </Button>
      <Collapse isOpen={infoOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">My Profile</CardTitle>
            Everything you need to know about yourself is there
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Wanted Hackers</CardTitle>
            There is a great reward for anyone who shuts down a hacker with a
            bounty on their head. Be careful, though. Placing a bounty on
            someone will attract attention to yourself
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Top Hackers</CardTitle>
            The best hackers in CyberhackerWarfare4000 are displayed here
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Top Alliances</CardTitle>
            An overview of the active alliances stats can be found here.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">
              Earn Battery
              <span role="img" aria-label="battery">
                &#9889;
              </span>
            </CardTitle>
            A variety of options for you to support CyberhackerWarfare4000
            and/or earn some battery
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Information</CardTitle>
            You are here right now!
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const communicationSection = (
    <div>
      <Button
        className="w-50"
        color="primary"
        onClick={() => setCommunicationOpen(!communicationOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Communication
      </Button>
      <Collapse isOpen={communicationOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Public Forum</CardTitle>
            Work in progress
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Messages</CardTitle>
            Send messages to other hackers. This will be red if you have an
            unread message
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Notifications</CardTitle>
            Whenever you are notified with an event, it will pop up here. This
            will be red if you have an unread notification
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const allianceSection = (
    <div>
      <Button
        className="w-50"
        color="primary"
        onClick={() => setAllianceOpen(!allianceOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Alliance
      </Button>
      <Collapse isOpen={allianceOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Create</CardTitle>
            Form an alliance, if you have the bitcoins for it
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const citySection = (
    <div>
      <Button
        className="w-50"
        color="primary"
        onClick={() => setCityOpen(!cityOpen)}
        style={{ marginBottom: "1rem" }}
      >
        City
      </Button>
      <Collapse isOpen={cityOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Local Hackers</CardTitle>
            An overview of the local hackers in your current city. If they are
            online, <FontAwesomeIcon
              className="text-warning"
              icon={faWifi}
            />{" "}
            will appear
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Service & Support</CardTitle>
            Heal up your system or hire body guards to protect yourself. The
            prices will raise every time you do this.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">VPN</CardTitle>
            Change your VPN status between several cities. Each city have their
            own prices and datacenters. You can only hack others within the same
            city
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Crypto Currency</CardTitle>
            <Xmas
              id={"siteMap"}
              size={"l"}
              updateGlobalValues={updateGlobalValues}
              user={user}
            />
            Buy and sell crypto currency. The prices changes every hour and are
            the same for every city. If you shutdown someone, you will get their
            currencies
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Marketplace</CardTitle>
            Boost your system by buying some aditional components. You can only
            hold one of each category
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Fence</CardTitle>
            Sell or buy your loot here. Prices varies from each city and each
            hour!
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Ledger</CardTitle>
            You can safely store your bitcoins in your ledger. Here it will be
            safe from being robbed. You can also transfer bitcoins to other
            users for a small fee
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const hackSection = (
    <div>
      <Button
        className="w-50"
        color="primary"
        onClick={() => setHackOpen(!hackOpen)}
        style={{ marginBottom: "1rem" }}
      >
        Hack
      </Button>
      <Collapse isOpen={hackOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Petty</CardTitle>
            The easiest and cheapest way to commit crimes. The higher the
            hacking skills, the higher the chance of success
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Crime</CardTitle>A variety of different crimes
            you can commit to earn some bitcoins and xp.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Datacenters</CardTitle>
            There are 5 datacenters in each city that you can own. By owning one
            or more, they will give you revenue by the minute. If owned by
            someone else, you can attack and destroy it
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Organized Crimes</CardTitle>
            Work in progress..
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Hack players</CardTitle>
            Takes you to the local hackers in your city. You can commit attacks
            on their profile
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  return (
    <div className="page-container d-flex justify-content-center">
      <div className="w-75">
        <h6>
          Current Round: <strong>2</strong>
        </h6>
        <h6>
          Round ends: <strong>3rd January</strong>
        </h6>
        {infoOpen &&
          hackOpen &&
          allianceOpen &&
          cityOpen &&
          communicationOpen && (
            <Xmas
              id={"informationHidden"}
              size={"l"}
              updateGlobalValues={updateGlobalValues}
              user={user}
            />
          )}
        <FAQ updateGlobalValues={updateGlobalValues} user={user} />
        <h1>SITE MAP</h1>
        {infoSection}
        {hackSection}
        {allianceSection}
        {citySection}
        {communicationSection}
      </div>
    </div>
  );
};



export default Information;
