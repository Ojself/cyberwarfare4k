import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

const ProgressBarFirewallSkill = props => {
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
      return 'myprofile-statpoints-displayer-blink';
    }
    if (hovered) {
      return 'myprofile-statpoint-displayer';
    }
    return 'myprofile-statpoints';
  };

  return (
    <div
      className={whatsMyClass()}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={e => blinkMe(e)}
    >
      <div style={{ fontSize: '0.7rem' }} className='text-center text-light'>
        Firewall
        {props.maxFirewall > 100 ? <>(+{props.maxFirewall - 100})</> : null}
      </div>

      <Progress multi className='mb-2 '>
        <Progress
          bar
          color='danger'
          value={props.value > 100 ? 100 : props.value}
          max={props.max > 100 ? 100 : props.max}
        />
        <Progress
          bar
          color='warning'
          value={props.value > 100 ? props.value - 100 : 0}
          max={props.max}
        ></Progress>
        <Progress bar color='dark' value={props.max - props.value}></Progress>
      </Progress>
    </div>
  );
};

export default ProgressBarFirewallSkill;
