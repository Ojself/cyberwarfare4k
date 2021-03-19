import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const SubscriptionIcon = ({ subscription }) => {
  const [subIconToolTip, setSubIconToolTip] = useState(false);
  const toggleSubIconToolTip = () => setSubIconToolTip(!subIconToolTip);
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
      <a
        id={"tooltipDesc-" + subIcons[subscription]}
        role="img"
        aria-label="subscription-icon"
        style={{ cursor: "pointer" }}
        target="_blank"
        rel="noopener noreferrer"
        href={"https://www.patreon.com/cyberhackerwarfare4000?fan_landing=true"}
      >
        {subIcons[subscription]}
      </a>
      <Tooltip
        placement="top"
        isOpen={subIconToolTip}
        target={"tooltipDesc-" + subIcons[subscription]}
        toggle={toggleSubIconToolTip}
      >
        {`${subscription} supporter!`}
      </Tooltip>
    </>
  );
};

export default SubscriptionIcon;
