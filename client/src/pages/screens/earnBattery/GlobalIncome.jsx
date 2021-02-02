import React, { useState } from "react";
import {
  Button,
  ListGroupItem,
  ListGroup,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";

const GlobalIncome = ({ batteryBonuses, userHasStarred, userSubscription }) => {
  const githubBonus = userHasStarred ? 1 : 0;
  const subscriptionBonus = batteryBonuses[userSubscription] || 0;
  const totalBonus = 6 + githubBonus + subscriptionBonus;
  const totalCheckMark = userHasStarred && !!userSubscription;
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  const getIcon = (active = false) => {
    return active ? <i className={`text-success fas fa-check`}></i> : "";
  };

  return (
    <div className="w-25">
      <Button id="showIncome" color="primary" type="button">
        Your active{" "}
        <span role="img" aria-label="battery">
          &#9889;
        </span>{" "}
        bonuses
      </Button>
      <Popover
        style={{ borderRadius: "2%", border: "1px #fbac73 solid" }}
        placement="left"
        target="showIncome"
        isOpen={popoverOpen}
        toggle={toggle}
      >
        <PopoverHeader>
          Hourly Income{" "}
          <span role="img" aria-label="battery">
            &#9889;
          </span>{" "}
        </PopoverHeader>
        <PopoverBody>
          <ListGroup>
            <ListGroupItem className="text-white">
              <span className="text-warning">{batteryBonuses.default}</span>{" "}
              Default {getIcon(true)}
            </ListGroupItem>
            <ListGroupItem>
              <span className="text-warning">{batteryBonuses.githubStar}</span>{" "}
              Star the game {getIcon(userHasStarred)}
            </ListGroupItem>
            <ListGroupItem>
              {userSubscription ? (
                <span className="text-warning">{subscriptionBonus}</span>
              ) : (
                <span className="text-warning">1-3</span>
              )}{" "}
              Patreon Supporter {getIcon(userSubscription)}
            </ListGroupItem>

            <ListGroupItem>
              <strong>
                <span className="text-warning">{totalBonus}</span> Total
              </strong>{" "}
              {getIcon(totalCheckMark)}
            </ListGroupItem>
          </ListGroup>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default GlobalIncome;
