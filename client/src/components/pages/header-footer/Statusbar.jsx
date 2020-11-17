import React from "react";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";

const StatusBar = ({ loading, user }) => {
  const shouldRender = !loading && !!user;
  return (
    <div className="statusBar">
      {shouldRender && (
        <div>
          <ul className="list-unstyled">
            {user.alliance && user.alliance.name ? (
              <li className="list-inline-item">
                <Link to={`/my-profile`}>
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
            <li className="list-inline-item " to="#">
              <strong>
                <Link className="text-light" to={`/my-profile`}>
                  {user.name}
                </Link>
              </strong>
            </li>

            <li className="list-inline-item">
              <span style={{ color: "red" }}>&#9829;</span>
              {(
                (user.playerStats.currentFirewall /
                  user.playerStats.maxFirewall) *
                100
              ).toFixed(0)}
              %
            </li>
            <li className="list-inline-item ml-2">
              <span>&#9889;{user.playerStats.battery}%</span>
            </li>
            <li className="list-inline-item ml-2">
              <span style={{ color: "#F08F18" }}>&#8383;</span>

              {Math.floor(user.playerStats.bitCoins).toLocaleString()}
            </li>
            <li className="list-inline-item ml-2">
              {user.playerStats.rankName}
            </li>
            <li className="list-inline-item ml-2">
              XP:{/*  {user.playerStats.exp} */}
            </li>
            <li style={{ width: "10vw" }} className="list-inline-item">
              <Progress
                color="warning"
                value={
                  (user.playerStats.exp / user.playerStats.expToLevel) * 100
                }
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default StatusBar;
