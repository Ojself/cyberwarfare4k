import React, { useState } from "react";
import { Progress } from "reactstrap";

const ProgressBarExp = props => {
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const toggleHover = () => {
    if (props.hasStatPoints) {
      setHovered(!hovered);
    }
  };

  const blinkMe = e => {
    if (props.hasStatPoints) {
      props.upgrade(props.name);
      setBlink(true);
      setTimeout(() => {
        setBlink(false);
      }, 100);
    }
  };

  const whatsMyClass = () => {
    if (blink) {
      return "myprofile-statpoint-exp-click ";
    }
    if (hovered) {
      return "myprofile-statpoint-exp-hover";
    }
    return "myprofile-statpoint";
  };

  return (
    <div
      className={whatsMyClass()}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={e => blinkMe(e)}
    >
      <div style={{ fontSize: "0.7rem" }} className="text-center text-light">
        Exp {props.value + "/ " + props.max}
      </div>

      <Progress multi className="mb-2 ">
        <Progress bar color={props.color} value={props.value} max={props.max} />
        <Progress
          bar
          color="dark"
          value={props.max - props.value}
          max={props.max}
        ></Progress>
      </Progress>
    </div>
  );
};

export default ProgressBarExp;
