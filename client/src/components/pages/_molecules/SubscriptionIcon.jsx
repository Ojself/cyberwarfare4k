import React from "react";

const SubscriptionIcon = ({ subscription }) => {
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
    <span
      title={`${subscription} supporter!`}
      role="img"
      aria-label="subscription-icon"
    >
      {subIcons[subscription]}
    </span>
  );
};

export default SubscriptionIcon;
