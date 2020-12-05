import React from 'react'

const SubscriptionIcon = ({ subscription }) => {
  const subIcons = {
    Bronze: "🥉",
    Silver: "🥈",
    Gold: "🥇",
    Platinum: "💎",
  };
  console.log(subscription);
  if (!subscription || !Object.keys(subIcons).includes(subscription)) {
    return false;
  }
  return (
    <span
      role="img"
      title={`${subscription} supporter!`}
      aria-label="subscription-icon"
    >
      {subIcons[subscription]}
    </span>
  );
};

export default SubscriptionIcon