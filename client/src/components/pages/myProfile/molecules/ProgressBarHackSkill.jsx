import React, { useState } from "react";
import { Progress } from "reactstrap";

const ProgressBarHackSkill = (props) => {
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const toggleHover = () => {
    if (props.hasStatPoints) {
      setHovered(!hovered);
    }
  };

  const blinkMe = (e) => {
    if (props.hasStatPoints) {
      setBlink(true);
      props.upgrade(props.name);
      setTimeout(() => {
        setBlink(false);
      }, 100);
    }
  };

  const whatsMyClass = () => {
    if (blink) {
      return "myprofile-statpoint-hack-click ";
    }
    if (hovered) {
      return "myprofile-statpoint-hack-hover";
    }
    return "myprofile-statpoint";
  };
  
  let skillWithoutBonus = props.bonus ? props.value - props.bonus: props.value
  if (skillWithoutBonus <= 0) {
    skillWithoutBonus = props.value;
  }

  return (
    <div
      name={props.name}
      className={whatsMyClass()}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={(e) => blinkMe(e)}
    >
      <div style={{ fontSize: "0.7rem" }} className="text-center text-light">
        {`${props.name} ${skillWithoutBonus}% ${
          props.bonus ? `+(${props.bonus})` : ""
        }`}
      </div>
      <Progress multi className="mb-2 mx-2" name={props.name}>
        <Progress bar color={props.color} value={skillWithoutBonus} max={100} />
        <Progress bar color="warning" value={props.bonus} max={100} />
        <Progress
          bar
          color="dark"
          max={200}
          value={200 - props.value}
        ></Progress>
      </Progress>
    </div>
  );
};

export default ProgressBarHackSkill;
