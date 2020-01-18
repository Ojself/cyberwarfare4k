import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import hackerComments from './hackerComments.js';
import hackerNames from './hackerNames.js';
import images from '../../utils/images.js';
// import api from "../../api";

import Login from '../Login';
import Signup from '../Signup';

const Home = props => {
  const [homeState, setHomeState] = useState({
    name: ''
  });

  const redirect = url => {
    console.log('redirecting', url);
    props.history.push(url);
  };

  const giveRandomHackerQuote = () => {
    const randomYear = Math.round(Math.random() * 30) + 1980;
    const hackerQuote = (
      <div>
        <blockquote class='blockquote text-center'>
          <p class='mb-0'>
            {hackerComments[Math.floor(Math.random() * hackerComments.length)]}
          </p>
          <footer class='blockquote-footer'>
            {hackerNames[Math.floor(Math.random() * hackerNames.length)]} (
            {randomYear})
          </footer>
        </blockquote>
      </div>
    );
    return hackerQuote;
  };
  return (
    <div style={{ marginTop: '-100px' }} className='d-flex flex-column'>
      <div className='d-flex flex-row justify-content-center'>
        <div className='d-flex flex-column w-25'>
          <img
            style={{ width: '20vw' }}
            src={images.utilImages[0].src}
            alt='Hacker Home'
          />
          {giveRandomHackerQuote()}
        </div>
        <div className='d-flex flex-column w-50 text-left'>
          <h1 className='display-1 '>CyberWarFare4000</h1>
          <h3 className='display-5 '>Multiplayer RPG Hacker Game</h3>
          <p className=''>
            CyberWareFare4000 is a free multiplyer hacker role playing game.
            Experience the life of a modern tech-savvy hacker and raise through
            the ranks of the cyber world.
          </p>
          <p className=''>
            What you become is entirely up to you-- a feared blackhat hacker
            doing ddos attacks, a basement dweller with a ledger full of
            cryptocurrency, a cyber security specialist with datacenters all
            over the globe, or maybe you'll make it to the top and become a part
            of the legendary Anonymous.
          </p>
          <div className='d-flex justify-content-center h-100'>
            <Login redirext={redirect} />
            <Signup redirect={redirect} />
          </div>
        </div>
        {/* Cards with avatars */}
      </div>

      <div
        style={{ marginTop: '100px' }}
        className='d-flex justify-content-center'
      >
        <iframe
          style={{ margin: '50px' }}
          width='560'
          title='ncis'
          height='315'
          src='https://www.youtube.com/embed/K7Hn1rPQouU'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
        ></iframe>

        <iframe
          style={{ margin: '50px' }}
          width='560'
          title='hacking'
          height='315'
          src='https://www.youtube.com/embed/pF-3S-HTJSg'
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen={true}
        ></iframe>
      </div>
      <footer>Footer here</footer>
    </div>
  );
};

export default Home;
