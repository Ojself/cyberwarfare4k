import React, {useState} from "react";
import { Progress, Tooltip } from "reactstrap";
import { Link } from "react-router-dom";
import "./statusbar.scss"

const StatusBar = ({ loading, user }) => {
  const [expTooltip, setExpTooltip] = useState(false);
  const toggleExpTooltip = () => setExpTooltip(!expTooltip);
  const visibleStatusBar = !loading && !!user;
  return (
    <div className="status-bar">
      {visibleStatusBar && (
        <ul className="list-unstyled mb-0">
          {user.alliance && user.alliance.name ? (
            <li className="list-inline-item">
              <Link to={`/alliance/${user.alliance._id}`}>
                <i
                  style={{
                    color: user.alliance.name,
                    fontSize: "30px",
                  }}
                  className="fab fa-redhat"
                ></i>
              </Link>
            </li>
          ) : (
            <li></li>
          )}
          <li className="list-inline-item display-none-when-mobile" to="#">
            <strong>
              <Link className=" text-light" to={`/my-profile`}>
                {user.name}
              </Link>
            </strong>
          </li>

          <li className="list-inline-item">
            <span style={{ color: "#dc3546" }}>&#9829;</span>
            {user.playerStats.currentFirewall.toFixed(0)}
          </li>
          <li className="list-inline-item ml-2">
            <span role="img" aria-label="battery">
              &#9889;
            </span>
            {user.playerStats.battery}%
          </li>
          <li className="list-inline-item ml-2">
            <span className="bitcoinColor">&#8383;</span>

            {Math.floor(user.playerStats.bitCoins)}
          </li>
          <li className="list-inline-item ml-2 display-none-when-mobile">
            {user.playerStats.rankName}
          </li>
          <li className="list-inline-item ml-2 display-none-when-mobile">
            XP:
          </li>
          <li id="experience-bar" className="list-inline-item">
            <Progress
              id="expTooltip"
              color="warning"
              value={(user.playerStats.exp / user.playerStats.expToLevel) * 100}
            ></Progress>
            <Tooltip
              placement="bottom"
              isOpen={expTooltip}
              target="expTooltip"
              toggle={toggleExpTooltip}
            >
              {`${user.playerStats.exp} / ${user.playerStats.expToLevel}`}
            </Tooltip>
          </li>
        </ul>
      )}
    </div>
  );
};
export default StatusBar;
