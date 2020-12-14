/* https://www.patreon.com/cyberhackerwarfare4000 */
import React, { useState } from "react";
import GlobalIncome from './GlobalIncome'
import api from "../../../api";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
  FormText,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  
} from "reactstrap";

const batteryBonuses = {
  default: 6,
  githubStar: 1,
  Bronze: 1,
  Silver: 2,
  Gold: 3,
}

const URLS = {
  chw4k: "https://github.com/Ojself/cyberwarfare4k",
  megarpg: "https://discord.com/invite/DZXZzC3",
  chessathor: "http://chessathor2.flesjoe.com/",
  patreon: "https://www.patreon.com/cyberhackerwarfare4000?fan_landing=true",
};

const styles = {
  ghimg: {
    paddingTop: "5%",
    margin: "auto",
    maxWidth: "10vw",
  },
  discordImg: {
    paddingTop: "5%",
    margin: "auto",
  },
  chessImg: {
    paddingTop: "5%",
    margin: "auto",
    maxWidth: "10vw",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
};

const EarnBattery = ({ user, globalLoading, updateGlobalValues }) => {
  const handleGenerate = async (event) => {
    const game = event.target.value;
    const data = await api.createBatteryQuery(game);
    updateGlobalValues(data,false);
  };
  const [githubName, setGithubName] = useState("");
  const handleChange = (event) => {
    setGithubName(event.target.value);
  };

  const icons = {
    fail: <i className="far fa-times-circle"></i>,
    success: <i className="fas fa-check"></i>,
  };

  const userHasGithub = globalLoading || !!user.earnBattery.githubUserName;
  const userHasStarred = globalLoading ? false : user.earnBattery.githubStar;
  const userHasSubscribed = globalLoading ? false : !!user.account.subscription

  const getButton = (game) => {
    if (!user || globalLoading) return;
    let onclick = (e) => handleGenerate(e);
    let innerText;
    let disabled = false;
    let cursor = "pointer";
    let width = "100%"
  
    const currentGame = user.earnBattery[game];
    console.log(currentGame,'current?')

    
    if (currentGame) {
      onclick = () => navigator.clipboard.writeText(currentGame);
      cursor = "copy";
      innerText = currentGame;
    } else {
      onclick = () => {};
      disabled = true;
      width = "85%"
      cursor = "default";
      innerText = "New code tomorrow";
    } 
    return (
      <InputGroup>
        <Button
          name={game}
          disabled={disabled}
          style={{ cursor: cursor, width:width }}
          value={game}
          onClick={onclick}
        >
          {innerText}
        </Button>
        {disabled && (
          <InputGroupText
            style={{ width: "15%" }}
            className="text-success d-flex justify-content-center"
          >
            <i className="fas fa-check"></i>
          </InputGroupText>
        )}
      </InputGroup>
    );
  };
  const githubUsernameInput = !globalLoading && (
    <InputGroup className="d-flex flex-column">
      <div className="d-flex flex-row">
        <Input
          name="githubName"
          value={githubName}
          disabled={userHasGithub}
          onChange={(e) => handleChange(e)}
          placeholder={
            userHasGithub ? user.earnBattery.githubUserName : "Github username"
          }
        />
        {userHasGithub ? (
          <InputGroupText
            className="text-success "
            className={`d-flex justify-content-center ${
              user.earnBattery.githubStar && "text-success"
            }`}
            title={
              !user.earnBattery.githubStar &&
              "If you already starred the project, try unstarring and starring again!"
            }
          >
            {userHasStarred ? icons.success : icons.fail}
          </InputGroupText>
        ) : (
          <InputGroupAddon addonType="append">
            <Button
              value={githubName}
              name="githubUserName"
              onClick={(e) => handleGenerate(e)}
            >
              Submit
            </Button>
          </InputGroupAddon>
        )}
      </div>
      {!userHasGithub && (
        <FormText>
          <span className="text-warning">
            The github username can't be changed after submitted
          </span>
        </FormText>
      )}
    </InputGroup>
  );
  const cardDeck = (
    <CardDeck className="d-flex justify-content-around h-100 mt-4">
      <Card>
        <CardImg
          top
          style={styles.ghimg}
          src="/earnBatteryPics/github_light.png"
          alt="Card image cap"
        />
        <CardBody style={styles.cardBody}>
          <CardTitle tag="h4">Star the game!</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Hourly bonus{" "}
            <span role="img" aria-label="battery">
              &#9889;
            </span>
          </CardSubtitle>
          <CardText>
            Submit your github username and star the{" "}
            <a target="_blank" rel="noopener noreferrer" href={URLS.chw4k}>
              CyberHackerWarfare4K
            </a>{" "}
            project at Github
          </CardText>
          {githubUsernameInput}
        </CardBody>
      </Card>
      <Card>
        <CardImg
          top
          style={styles.ghimg}
          src="/earnBatteryPics/patreon_light.png"
          alt="Card image cap"
        />
        <CardBody className="d-flex" style={styles.cardBody}>
          <CardTitle tag="h4">Patreon</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            Hourly bonus{" "}
            <span role="img" aria-label="battery">
              &#9889;
            </span>
          </CardSubtitle>
          <CardText>
            Support CyberhackerWarfare4000 at
            <a target="_blank" rel="noopener noreferrer" href={URLS.patreon}>
              {" "}
              Patreon
            </a>
          </CardText>
          <InputGroup>
            <a
              target="_blank"
              style={{ width: `${userHasSubscribed ? "85%" : "100%"}` }}
              rel="noopener noreferrer"
              href={URLS.patreon}
            >
              <Button className="w-100" name="Patreon">
                {user && userHasSubscribed
                  ? `${user.account.subscription} supporter 🎉`
                  : "Support CHW4K!"}
              </Button>
            </a>
            {userHasSubscribed && (
              <InputGroupText
                style={{ width: "15%" }}
                className="text-success d-flex justify-content-center"
              >
                {icons.success}
              </InputGroupText>
            )}
          </InputGroup>
        </CardBody>
      </Card>

      <Card>
        <CardImg
          top
          style={styles.discordImg}
          src="/earnBatteryPics/discord.png"
          alt="Card image cap"
        />
        <CardBody style={styles.cardBody}>
          <CardTitle tag="h4">MEGA rpg</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            10{" "}
            <span role="img" aria-label="battery">
              &#9889;
            </span>{" "}
            Every day
          </CardSubtitle>
          <CardText>
            Join the{" "}
            <a target="_blank" rel="noopener noreferrer" href={URLS.megarpg}>
              MEGA rpg
            </a>{" "}
            Discord server and type !hack 'code'{" "}
          </CardText>
          {getButton("megarpg")}
        </CardBody>
      </Card>
      <Card>
        <CardImg
          top
          style={styles.chessImg}
          src="/earnBatteryPics/chess.png"
          alt="Card image cap"
        />
        <CardBody style={styles.cardBody}>
          <CardTitle tag="h4">Chessathor</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            15{" "}
            <span role="img" aria-label="battery">
              &#9889;
            </span>{" "}
            Every day
          </CardSubtitle>
          <CardText>
            Play through 22 levels of{" "}
            <a target="_blank" rel="noopener noreferrer" href={URLS.chessathor}>
              Chessathor
            </a>{" "}
            and input the 'code' to receive the battery bonus!{" "}
          </CardText>
          {getButton("chessathor")}
        </CardBody>
      </Card>
    </CardDeck>
  );

  
  
  return (
    <div
      className="display-flex justify-content-center mx-5 h-100"
      style={{ height: "60vh" }}
    >
      <div className="d-flex justify-content-between">
        <div className="w-25"></div>
        <h1 className="w-25">Earn battery</h1>
        {!globalLoading && user &&(
        <GlobalIncome
          batteryBonuses={batteryBonuses}
          userHasStarred={userHasStarred}
          userSubscription={user.account.subscription}
        />
        )}
      </div>
      {cardDeck}
    </div>
  );
};

export default EarnBattery;
