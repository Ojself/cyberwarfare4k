import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const SubscriptionIcon = ({ subscription }) => {
  const [subIconToolTip, setSubIconToolTip] = useState(false);
  const toggleSubIconTOolTip = () => setSubIconToolTip(!subIconToolTip);
  const subIcons = {
    Bronze: "🥉",
    Silver: "🥈",
    Gold: "🥇",
    Platinum: "💎",
  };
  if (!subscription || !Object.keys(subIcons).includes(subscription)) {
    return false;
  }
  return (
    <>
      <span
        id={"tooltipDesc-" + subIcons[subscription]}
        role="img"
        aria-label="subscription-icon"
      >
        {subIcons[subscription]}
      </span>
      <Tooltip
        placement="top"
        isOpen={subIconToolTip}
        target={"tooltipDesc-" + subIcons[subscription]}
        toggle={toggleSubIconTOolTip}
      >
        {`${subscription} supporter!`}
      </Tooltip>
    </>
  );
};

export default SubscriptionIcon;
