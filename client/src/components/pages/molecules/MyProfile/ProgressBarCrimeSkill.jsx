import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

const ProgressBarCrimeSkill = props => {
  const [hovered, setHovered] = useState(false);
  const [blink, setBlink] = useState(false);
  const toggleHover = () => {
    if (props.hasStatPoints) {
      setHovered(!hovered);
    }
  };

  const blinkMe = e => {
    if (props.hasStatPoints) {
      const upgradeName = e.target.getAttribute('name');
      props.upgrade(upgradeName);
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
      name={props.name}
      className={whatsMyClass()}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={e => blinkMe(e)}
    >
      <div
        name={props.name}
        style={{ fontSize: '0.7rem' }}
        className='text-center text-light'
      >
        {props.name}
      </div>

      <Progress
        name={props.name}
        color={props.color}
        className='mb-2 mx-2'
        value={props.value}
        max={props.max}
      />
    </div>
  );
};

export default ProgressBarCrimeSkill;
