import React, {useState} from "react";
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
import "./orgCrimes.scss"

const findRequiredHackers = (crime) => {
  let requiredHackers = [];
  ["Forensics", "Technical", "Cryptography", "Social Engineering"].forEach(
    (type) => {
      if (Object.keys(crime).includes(type)) {
        requiredHackers.push(type);
      }
    }
  );
  return requiredHackers;
};

const OrgCrimeCardClaimed = ({ crime, claimRole, commitCrime }) => {
  const requiredHackers = findRequiredHackers(crime);
  const [descriptionTooltip, setDescriptionTooltip] = useState(false);

  const toggleDesc = () => setDescriptionTooltip(!descriptionTooltip);
  return (
    <div>
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
          {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
          </CardSubtitle> */}
          <CardText>
            <div className="d-flex flex-column  w-100">
              {requiredHackers.map((role) => {
                const hackerName = crime[role].owner ? (
                  <strong>{crime[role].owner.name}</strong>
                ) : (
                  <span id="org-crime-join" onClick={() => claimRole(crime._id, role)}>Join</span>
                );
                return (
                  <div className="d-flex flex-row w-100">
                    <Badge
                      style={{
                        width: "60%",
                        marginTop: "0.15rem",
                        paddingTop: "0.5rem",
                      }}
                      color="success"
                    >
                      {role}
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
            </div>
          </CardText>
          <Button
            color="outline-danger"
            onClick={() => commitCrime( crime._id)}
          >
            Commit
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrgCrimeCardClaimed;
