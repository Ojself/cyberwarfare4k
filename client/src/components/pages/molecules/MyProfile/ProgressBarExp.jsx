import React, { useState, useEffect } from 'react';
import { Progress } from 'reactstrap';

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
        Exp {props.value + '/ ' + props.max}
      </div>

      <Progress
        color={props.color}
        className='mb-2 '
        value={props.value}
        max={props.max}
      />
    </div>
  );
};

export default ProgressBarExp;
