import React, { useState } from "react";

/* Returns a span with a value that gets copied upon click */
const ClickAndCopy = ({ elementInnerText }) => {
  const [activeBitcoins, setActiveBitcoins] = useState(false);
  const blinkBitcoins = () => {
    setActiveBitcoins(true);
    setTimeout(() => {
      setActiveBitcoins(false);
    }, 200);
  };
  const copyToClipBoard = (value) => {
    navigator.clipboard.writeText(value);
    blinkBitcoins();
  };
  const element = (
    <span
      style={{
        cursor: "pointer",
        color: activeBitcoins ? "#1BAF6B" : "white",
      }}
      onClick={() => copyToClipBoard(Math.floor(elementInnerText))}
    >
      {elementInnerText}
    </span>
  );

  return element;
};

export default ClickAndCopy;
