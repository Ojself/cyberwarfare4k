import React, { useState, useEffect } from "react";
import {
   Button
} from 'reactstrap';
import hackerComments from './hackerComments.js'
import hackerNames from './hackerNames.js'
import images from '../../utils/images.js'
// import api from "../../api";

import Login from "../Login";
import Signup from "../Signup";

const Home = () => {
  const [homeState, setHomeState] = useState({
    name: ""
  });

  const giveRandomHackerQuote= ()=>{
    const randomYear = Math.floor(Math.random()*50) + 1950
    const hackerQuote = (
    <div>
    <p>{hackerComments[Math.floor(Math.random()*hackerComments.length)]}</p>
    <p>- {hackerNames[Math.floor(Math.random()*hackerNames.length)]} ({randomYear})</p>
    </div>
    )
    return hackerQuote
  }
  return ( 

    <div style={{backgroundColor:'black'}} className="d-flex flex-column justify-content-center  text-light">
    <div className="d-flex flex-row">
      <div className="d-flex flex-column w-25">
        <img style={{width:'20vw'}} src={images.utilImages[0].src} alt="Hacker Home"  />
        {giveRandomHackerQuote()}
      </div>
      <div className="d-flex flex-column w-50">
        <h1 className="display-1" >
          CyberWareFare4000
        </h1>
        <h3 className="display-5">
          Multiplayer RPG Hacker Game
        </h3>
        <p>
          CyberWareFare4000 is a free multiplyer hacker role playing game. Experience the life of a modern tech-savvy hacker and raise through the ranks of the cyber world.
        </p>
        <p>
           What you become is entirely up to you-- a feared blackhat hacker doing ddos attacks, a basement dweller with a ledger full of cryptocurrency, a cyber security specialist with datacenters all over the globe, or maybe you'll make it to the top and become a part of the legendary Anonymous.
        </p>
      <div className="d-flex justify-content-center">
        <Login />
        <Signup />
      </div>
      </div>
      {/* Cards with avatars */}
      
      </div>
      
      
      <div className='d-flex justify-content-around'>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/K7Hn1rPQouU" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
      
      <iframe width="560" height="315" src="https://www.youtube.com/embed/pF-3S-HTJSg" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true}></iframe>
      </div>
    </div>
  );
};
  

export default Home;
