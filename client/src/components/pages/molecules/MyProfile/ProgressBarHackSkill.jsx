import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

const ProgressBarHackSkill = props => {
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
      <div style={{ fontSize: '0.7rem' }} className='text-center text-light'>
        {props.name}
      </div>
      <Progress multi className='mb-2 mx-2' name={props.name}>
        <Progress
          bar
          color='primary'
          value={props.skill}
          max={100}
          name={props.name}
        />
        <Progress
          bar
          color='warning'
          value={props.bonus}
          max={100}
          name={props.name}
        />
      </Progress>
    </div>
  );
};

export default ProgressBarHackSkill;
