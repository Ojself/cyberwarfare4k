import React from "react";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";

const StatusBar = ({ loading, user }) => {
  const shouldRender = !loading && !!user;
  return (
    <div className="statusBar">
      {shouldRender && (
        <ul className="list-unstyled">
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
          <li className="list-inline-item" to="#">
            <strong>
              <Link className="text-light" to={`/my-profile`}>
                {user.name}
              </Link>
            </strong>
          </li>

          <li className="list-inline-item">
            <span style={{ color: "red" }}>&#9829;</span>
            {user.playerStats.currentFirewall.toFixed(0)}
            %
          </li>
          <li className="list-inline-item ml-2">
            <span role="img" aria-label="battery">
              &#9889;
            </span>
            {user.playerStats.battery}%
          </li>
          <li className="list-inline-item ml-2">
            <span style={{ color: "#F08F18" }}>&#8383;</span>

            {Math.floor(user.playerStats.bitCoins)}
          </li>
          <li className="list-inline-item ml-2">{user.playerStats.rankName}</li>
          <li className="list-inline-item ml-2">XP:</li>
          <li style={{ width: "10vw" }} className="list-inline-item">
            {/* <span style={{fontSize: "0.5rem"}}>123</span> */}
            <Progress
              title={`${user.playerStats.exp} / ${user.playerStats.expToLevel}`}
              color="warning"
              value={(user.playerStats.exp / user.playerStats.expToLevel) * 100}
            ></Progress>
          </li>
        </ul>
      )}
    </div>
  );
};
export default StatusBar;
