import React, { useEffect } from "react";

import hackerComments from "../_helpers/hackerComments";
import hackerNames from "../_helpers/hackerNames";
import images from "../_helpers/images";
import api from "../../../api";

import Login from "../loginSignup/Login";
import Signup from "../loginSignup/Signup";

import "./homeStyling.scss";
const Home = (props) => {
  useEffect(() => {
    redirectToCorrectPage().then((result) => {});
  }, []);

  const redirectToCorrectPage = async () => {
    const reDirectInformation = await api.getRedirectInfo();
    const status = reDirectInformation.status;

    if (status.userInstance && status.isSetup) {
      return redirect("/my-profile");
    }
    if (status.userInstance) {
      return redirect("/create-hacker");
    }
    return false;
  };

  const redirect = (url) => {
    props.history.push(url);
  };

  const getRandomHackerQuote = () => {
    const randomYear = Math.round(Math.random() * 30) + 1980;
    const hackerQuote = (
      <div>
        <blockquote className="blockquote text-center">
          <p className="mb-0">
            {hackerComments[Math.floor(Math.random() * hackerComments.length)]}
          </p>
          <footer className="blockquote-footer">
            {hackerNames[Math.floor(Math.random() * hackerNames.length)]} (
            {randomYear})
          </footer>
        </blockquote>
      </div>
    );
    return hackerQuote;
  };
  return (
    <div>
      <div>
        <img
          id="navbarReplacer"
          src={images.utilImages[3].src}
          alt="Cyber Header"
        />
      </div>
      <div className="d-flex  justify-content-center">
        <div className="d-flex flex-column w-25">
          <img
            style={{ marginTop: "-50px", width: "80%" }}
            src={images.utilImages[0].src}
            alt="Hacker Home"
          />
          {getRandomHackerQuote()}
        </div>
        <div className="d-flex flex-column w-50 text-left">
          <h1 className="display-1 ">CyberWarFare4000</h1>
          <h3 className="display-5 ">Multiplayer RPG Hacker Game</h3>
          <p className="">
            CyberWareFare4000 is a free multiplyer hacker role playing game.
            Experience the life of a modern tech-savvy hacker and raise through
            the ranks of the cyber world.
          </p>
          <p className="">
            What you become is entirely up to you-- a feared blackhat hacker
            doing ddos attacks, a basement dweller with a ledger full of
            cryptocurrency, a cyber security specialist with datacenters all
            over the globe, or maybe you'll make it to the top and become a part
            of the legendary Anonymous.
          </p>
          <div className="d-flex justify-content-center h-100">
            <Login redirect={redirect} />
            <Signup redirect={redirect} />
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: "100px" }}
        className="d-flex justify-content-center"
      >
        <iframe
          style={{ margin: "50px" }}
          width="560"
          title="ncis"
          height="315"
          src="https://www.youtube.com/embed/K7Hn1rPQouU"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>

        <iframe
          style={{ margin: "50px" }}
          width="560"
          title="hacking"
          height="315"
          src="https://www.youtube.com/embed/pF-3S-HTJSg"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
