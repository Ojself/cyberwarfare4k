import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { Collapse, Button, CardBody, CardTitle, Card } from "reactstrap";

const Information = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const [hackOpen, setHackOpen] = useState(false);
  const [allianceOpen, setAllianceOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [communicationOpen, setCommunicationOpen] = useState(false);

  const infoSection = (
    <div>
      <Button
        className="w-25"
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
        className="w-25"
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
        className="w-25"
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
        className="w-25"
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
            <CardTitle tag="h3">Chip Chop Shop</CardTitle>
            Work in progress
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
        className="w-25"
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
            Work In Progress
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Hack players</CardTitle>
            Work In Progress, try attacking players through their profile
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  return (
    <div className="page-container">
      <h1>INFORMATION</h1>
      <div className="content">
        {infoSection}
        {hackSection}
        {allianceSection}
        {citySection}
        {communicationSection}
      </div>
    </div>
  );
};

/* return (
    <div>
      <h1>INFORMATION</h1>

      <div>
        <p>
          <strong>HOME</strong>: Here you can find a general overview about your
          player stats etc.
        </p>

        <strong>STATS:</strong>

        <p>
          <span>FIREWALL</span>: Indicates your HP. If it reaches zero it will
          result in your death and a penalty will follow.
        </p>

        <p>
          <span>BATTERY</span>: Indicates your stamina. Battery of your computer
          will decrease as you perform actions. It will recharge 10%
          automatically every 20 minutes or by sending us a donation.
        </p>

        <p>
          <span>CPU</span>: Indicates your strength. The better your CPU-stat,
          the better you will perform in Crimes and hacking other players.
        </p>

        <p>
          <span>ANTIVIRUS SYSTEM (AVS)</span>: Indicates your defense. A good
          Firewall-stat will help you defend against enemy hackers.
        </p>

        <p>
          <span>ENCRYPTION</span>: Indicates your dodge. Dodging will help you
          to dodge and hitting enemy players or succeeding in Crime.
        </p>

        <p>
          <span>EXP</span>: indicates your experience. The more Crimes and
          Hacking you do, the more EXP you will get. For each milestone, you'll
          get a new Rank.
        </p>

        <p>
          <span>BITCOINS</span>: Indicates your wealth. You can use your
          Bitcoins to purchase items in the Marketplace. You can gain or lose
          them by hacking others.
        </p>

        <p>
          <span>CRIME SKILL</span>: Indicates your PvE skill. The higher the
          skill, the higher the chance of success in Crimes
        </p>

        <p>
          <strong>RANK</strong>: Indicates your level of experience as a hacker.
          This symbolize status more than anything else.
        </p>

        <p>
          <strong>CRIMES</strong>: Here you can conduct various kinds of crimes.
          If you succeed in your crime, you'll be granted some Bitcoins and EXP
          for the effort. The easiest ones are on top and the most difficult are
          at the bottom.
        </p>

        <p>
          <strong>HACK PLAYER</strong>: Here you can attack other players by
          hacking them. Every stat, except Crime Skill, will affect the outcome
          of the attack. If you succeed, you'll steal some of the opponents
          bitcoins, as well as lowering his Firewall. Regardless of the outcome,
          your battery will lower.
        </p>

        <p>
          <strong>EVENTS</strong>: Shows you the latest events that has happend
          to your character.
        </p>

        <p>
          <strong>WANTED LIST</strong>: In the Wanted List you can add bounty on
          other players head, as well as being able to see which player already
          having a bounty on his head. You can collect this by hacking them
          until their Firewall is 0.
        </p>

        <p>
          <strong>FORUM, GROUPKILL AND HIDEOUT</strong> are not deployed yet.
        </p>

        <p>
          <strong>MARKETPLACE</strong>: You can boost your character by buying
          new equipment for your computer. You can only hold one item from each
          group: CPU, AntiVirus, Firewall, Encryption.
        </p>

        <p>
          <strong>SERVICE</strong>: The service shop allows you to fix up your
          computer for a relatively small fee. Choose between a quick fix or a
          full service.
        </p>

        <p>
          <strong>LADDER</strong>: The ladder offers a overview of the other
          players in the game. The best ones are usually on top.
        </p>

        <p>
          <strong>INFORMATION</strong>: You're here right now
        </p>

        <p>
          <strong>ARCADE</strong>: Enjoy yourself with some top-of-the-class
          games
        </p>

        <p>
          <strong>LOGOUT</strong>: No worries, it won't wipe your harddrive..
        </p>
      </div>

      <p>
        This game was made by three norgies that was seeking the nostaliga of
        text-based mmorpg.
      </p>

      <p>
        Thanks to Lukas, Vivian and Noellia for making the project come true.
      </p>
    </div>
  ); */

export default Information;
