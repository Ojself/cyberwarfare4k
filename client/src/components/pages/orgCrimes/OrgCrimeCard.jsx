import React, { useState } from 'react';
import {
  Card,
  CardImg,
  Badge,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Tooltip
} from "reactstrap";

const findRequiredHackers = (crime)=>{
    let requiredHackers = [];
    ['Forensics', 'Technical', 'Social Engineering', 'Cryptography'].forEach(type=>{
        if (Object.keys(crime).includes(type)){
        requiredHackers.push(type)
        }
    })
    return requiredHackers;
}

const OrgCrimeCard = ({crime, claimCrime}) => {
    const [descriptionTooltip, setDescriptionTooltip] = useState(false);
    const [requiredHackersTooltip, setRequiredHackersTooltip] = useState(false);
    const toggleDesc = () => setDescriptionTooltip(!descriptionTooltip);
    const toggleReq = () => setRequiredHackersTooltip(!requiredHackersTooltip);
    const requiredHackers = findRequiredHackers(crime)
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
          <CardSubtitle
            id={"requiredHackers-" + crime._id}
            tag="h6"
            className="mb-2 text-muted"
          >
            Required Hackers: {requiredHackers.length}
          </CardSubtitle>
          <Tooltip
            placement="right"
            isOpen={requiredHackersTooltip}
            target={"requiredHackers-" + crime._id}
            toggle={toggleReq}
          >
            {requiredHackers.map((hacker) => {
              return (
                <Badge color="success" pill>
                  {hacker}
                </Badge>
              );
            })}
          </Tooltip>

          {/* <CardText>{crime.description}</CardText> */}
          <Button color="secondary" onClick={() => claimCrime(crime._id)}>Claim</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrgCrimeCard
