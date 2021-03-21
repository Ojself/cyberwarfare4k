import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Tooltip,
  Button,
} from "reactstrap";
import "./orgCrimes.scss";

const isOcDisabled = (user,crime) => {
  if (!user || !user.alliance || !crime){
    return true
  }
  const amountMembersInCrime = crime.roles.filter(role=> !!role.owner).length

  const userAndCrimeSameAlliance = user.alliance._id === crime.ownerAlliance._id 
  const allRolesAreFilled = amountMembersInCrime === crime.roles.length
  const userIsOwner = user._id === crime.owner._id

  return !((userAndCrimeSameAlliance && allRolesAreFilled) || userIsOwner)
}

const OrgCrimeCardClaimed = ({ crime, claimRole, commitOrgCrime, user }) => {
  const [descriptionTooltip, setDescriptionTooltip] = useState(false);

  const toggleDesc = () => setDescriptionTooltip(!descriptionTooltip);
  
  const userIsAttendingCrime = user && !!crime.roles.find(role=> role.owner && role.owner._id === user._id)
  const batteryCostOverview = (
    <>
      <span role="img" aria-label="battery">
        &#9889;   
      </span>
      5
    </>
  );

 
  return (
    <div >
      <Card style={{ width: "18rem" }}>
        <CardImg
          top
          width="100%"
          src={`../orgCrimePics/${crime.image}.jpg`}
          alt={crime.image}
        />
        <CardBody>
          <CardTitle
            id={"tooltipDesc-" + crime._id}
            className="text-warning"
            tag="h5"
          >
            <Link to={`/alliance/${crime.ownerAlliance._id}`}>
              <i
                style={{
                  color: crime.ownerAlliance.name,
                  fontSize: "20px",
                }}
                className="fab fa-redhat"
              ></i>
            </Link>{" "}
            {crime.name}
          </CardTitle>
          <Tooltip
            placement="right"
            isOpen={descriptionTooltip}
            target={"tooltipDesc-" + crime._id}
            toggle={toggleDesc}
          >
            {crime.description}
          </Tooltip>
          <CardText className="d-flex flex-column w-100">
            {crime.roles.map((role) => {
              
              const hackerName = role.owner ? (
                <strong>{role.owner.name}</strong>
              ) : (
                <div>
                <span
                  id="org-crime-join"
                  onClick={() => claimRole(crime._id, role.roleName)}
                >
                  Join
                </span>
                {!userIsAttendingCrime && batteryCostOverview}
                </div>
                
              );
              return (
                <div key={role._id} className="d-flex flex-row w-100">
                  <Badge
                    style={{
                      width: "60%",
                      marginTop: "0.15rem",
                      paddingTop: "0.5rem",
                    }}
                    color="success"
                  >
                    {role.roleName}
                  </Badge>
                  <div
                    style={{
                      width: "40%",
                      marginTop: "0.15rem",
                      paddingTop: "0.5rem",
                    }}
                  >
                    {hackerName}
                  </div>
                </div>
              );
            })}
          </CardText>
          <Button
            disabled={isOcDisabled(user,crime)}
            color="outline-danger"
            onClick={() => commitOrgCrime(crime._id)}
          >
            Commit
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrgCrimeCardClaimed;
