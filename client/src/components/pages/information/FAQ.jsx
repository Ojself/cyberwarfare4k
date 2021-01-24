import React, { useState } from "react";
import {
  Collapse,
  Button,
  CardBody,
  CardTitle,
  Card,
  Col,
  Row,
  Container,
} from "reactstrap";

const FAQ = () => {
  const [statPointOpen, setStatPointOpen] = useState(false);
  const [attackOpen, setAttackOpen] = useState(false);
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [batteryOpen, setBatteryOpen] = useState(false);

  const statPoints = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setStatPointOpen(!statPointOpen)}
        style={{ marginBottom: "1rem" }}
      >
        What does the different skills mean?
      </Button>
      <Collapse isOpen={statPointOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Crime skills</CardTitle>
            There are 4 crime skills: Technical, Forensics, Social Engineering
            and Cryptography. These skills can be gained by doing petty crimes,
            normal crimes or upgrading them with your stat points. The more
            crime skills you have, the more chance of success you have for
            commiting crimes and commiting fraud against other hackers!
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Hack skills</CardTitle>
            There are 3 hack skills: CPU, AntiVirus and Encryption. These skills
            determines your hit/miss chance when going into battle with an
            opponent hacker.{" "}
            <strong>
              CPU is effective versus AntiVirus, AntiVirus is effective versus
              Encryption and Encryption is effective versus CPU.{" "}
            </strong>{" "}
            Make sure to have the right equipped weapon when going into battle -
            or when suspecting an incoming attack. You can buy components in the
            market place if you have the bitcoins
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Firewall</CardTitle>
            The firewall stat point represents your overall HP. You start off
            with 100HP, but this can be upgraded with statpoints or in the
            market place. Your Firewall might go down when attacked by others.
            But you can repair yourself in the Service & Support.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Experience</CardTitle>
            You gain experience by doing various crimes. The more experience you
            get, the higher the rank of your hacker will be. With every new
            rank, you get 5 stat points you can spend in your profile page.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const moneyMakingSystem = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setMoneyOpen(!moneyOpen)}
        style={{ marginBottom: "1rem" }}
      >
        How do I earn bitcoins (money)?
      </Button>
      <Collapse isOpen={moneyOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Crimes</CardTitle>
            All sorts of crimes will give you both experience and bitcoins or
            stash. The higher your crime skills, the more successful you are,
            which results in more bitcoins and experience.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Frauds</CardTitle>
            Why earn your own bitcoins when you can steal from others? Use your
            crime skills and dig deep into the pockets of your enemies! Make
            sure to protect yourself from other thiefs and secure your bitcoins
            in your ledger.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Fence</CardTitle>
            Gimmie the loot! The fence is always looking to buy your stolen
            stash. Head over to the shop and sell whatever you got. The prices
            varies from each hour and city. Also, the local alliance might take
            a fee for selling your items in their city!
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Data centers</CardTitle>
            There are 5 data centers in each city throughout the world of
            cyberhackerwarfare4000. Upon purchase, you will receive a small
            income every minute. Make sure to stock up on cables as they are
            required to recieve your income.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Crypto Currency</CardTitle>
            Arguably the best way to get rich fast. The rules are simple, buy
            low and sell high. Be careful, though, as your name will show as
            most recent buyer after purchasing. Prices changes every hour
            (except at night) and is the same for every city.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const earnBatterySystem = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setBatteryOpen(!batteryOpen)}
        style={{ marginBottom: "1rem" }}
      >
        How do I get more battery?
      </Button>
      <Collapse isOpen={batteryOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Github</CardTitle>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Ojself/cyberwarfare4k"
            >
              CyberhackerWarfare4000
            </a>{" "}
            is an open source project and can be found on Github. You will
            receive an hourly battery bonus by entering your Github username in
            the "earn-battery" page and giving the project a star on Github
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Patreon</CardTitle>
            Support the project at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://www.patreon.com/cyberhackerwarfare4000?fan_landing=true"
              }
            >
              {" "}
              Patreon
            </a>{" "}
            and you will recieve an hourly battery bonus and a huge thank you
            for supporting open source. The money will go to new features and
            upkeeping the servers.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Megarpg</CardTitle>
            Join the megarpg and type in the code to get a battery bonus. You
            can do this once every day. The code is case sensitive!
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Chessathor</CardTitle>
            Play through the Chessathor game and insert the code (included the
            #) in the player name input to get a battery bonus. You can do this
            once every day. The code is case sensitive!
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  const combatSystem = (
    <div>
      <Button
        className="w-75"
        color="success"
        onClick={() => setAttackOpen(!attackOpen)}
        style={{ marginBottom: "1rem" }}
      >
        How do I attack other players?
      </Button>
      <Collapse isOpen={attackOpen}>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Fraud</CardTitle>
            You can earn bitcoins by frauding other hackers in your city. The
            chance of success is based upon the attackers total crime skills and
            the defenders AntiVirus.
            <br />
            <br />
            Chance for succesful fraud ={" "}
            <strong>
              attackers average crime skills / (defenders AntiVirus * 1.125){" "}
            </strong>{" "}
            <br />
            Percentage of victim bitcoins stolen ={" "}
            <strong>attacker rank / 100 * 4</strong>
            <br />
            NB! A small random number generator (rng) is applied to every
            attack.
            <br />
            <br />
            You can protect yourself from other hackers by having your bitcoins
            stored in the ledger or upgrading your AntiVirus. A fraud will lead
            to a 5 minute grace period.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Attack</CardTitle>
            If you need to get someone out of the way for good, then attacking
            is your best option. The equipped weapon of both you and your
            opponent will determine the hit/miss chance.
            <br />
            CPU is effective versus AntiVirus. AntiVirus is effective versus
            Encryption. And Encryption is efective versus CPU.
            <br />
            Damage inflication ={" "}
            <strong>
              (Weapon Skill * effect bonus * 0.1) + (rank level * 1.5)
            </strong>
            <br />
            EG: (130 * 1.5 * 0.1) + (7 * 1.5) = <strong>34,5</strong> damage
            <br />
            <br /> An attack, successful or not, will grace the player for 60 or
            5 minutes depending on their online status. If you manage to bring a
            player down 0 or less firewall, the player is shutdown and is forced
            to start over. You will get whatever crypto currency the player was
            carrying at the time of a shutdown.
          </CardBody>
        </Card>
        <Card className="mb-2">
          <CardBody>
            <CardTitle tag="h3">Grace period</CardTitle>
            When someone is attacked, a grace will protect the hacker for a
            certain time. A fraud will result in a 5 minute grace, while attack
            will be 5 or 60 minutes grace depending on the online status.
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );

  return (
    <div>
      <h1>FAQ</h1>
      <Container>
        <Row xs="1" className="d-flex justify-content-center">
          <Col md="8" sm="12">
            {statPoints}
          </Col>

          <Col md="8" sm="12">
            {moneyMakingSystem}
          </Col>

          <Col md="8" sm="12">
            {combatSystem}
          </Col>

          <Col md="8" sm="12">
            {earnBatterySystem}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQ;
