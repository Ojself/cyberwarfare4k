import React, { useState, useEffect } from 'react';
import api from '../../../api';

const PettyHack = () => {
  const [pettyState, setPettyState] = useState({
    loading: true,
    message: null,
    hacking: false
  });

  useEffect(() => {
    console.log('using effect');
  }, []);

  const toggleHack = () => {
    setPettyState({
      ...pettyState,
      hacking: !pettyState.hacking
    });
    startHack();
  };

  const startHack = () => {
    console.log('start hack', pettyState.hacking);
    api.pettyHack().then(result => {
      console.log(result);
    });
  };

  return (
    <div className='PettyHack'>
      <h2>Petty hackr</h2>
      <button onClick={toggleHack}>Start hacking</button>
      {pettyState.message && <div className='info'>{pettyState.message}</div>}
    </div>
  );
};

export default PettyHack;
