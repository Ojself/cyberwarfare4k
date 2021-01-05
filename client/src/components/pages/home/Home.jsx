import React, { useEffect } from "react";

import hackerComments from "../_helpers/hackerComments";
import hackerNames from "../_helpers/hackerNames";
import images from "../_helpers/images";
import api from "../../../api";
import {Container, Row, Col} from "reactstrap"
import Login from "./Login";
import Signup from "./Signup";

import "./home.scss";

const randomHackerQuote = () => {
  const randomYear = Math.round(Math.random() * 30) + 1980;
  const hackerQuote = (
    <div className="d-none d-lg-block">
      <blockquote className="blockquote text-center">
        <p className="mb-0 ">
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
const Home = (props) => {
  useEffect(() => {
    redirectToCorrectPage().then(() => {});
  }, []);

  const redirectToCorrectPage = async () => { // move to backcend TODO
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

  
  return (
    <div className="w-100">
      <div className="w-100">
        <img
          id="navbarReplacer"
          src={images.utilImages[3].src}
          alt="CHWF4K Header"
        />
      </div>
      <div className="home ">
        <div className="imageAndQuote">
          <img
            style={{ zIndex: "1", marginTop: "-50px", width: "80%" }}
            src={images.utilImages[0].src}
            alt="Hacker Home"
          />
          {randomHackerQuote()}
        </div>
        <div className="home-container">
          <h1 id="homeHeader" className="text-center display-1 ">
            {/* Empty by design */}
          </h1>
          <h3 className="display-5 text-center text-warning">
            Multiplayer RPG Hacker Game
          </h3>
          <h6 className="text-center text-info">NordVPN prototype w/ Laura</h6>
          <div className="descriptionText">
            <p>
              CyberhackerWarefare4000 is a free multiplyer hacker role playing
              game. Experience the life of a modern tech-savvy hacker and raise
              through the ranks of the cyber world.
            </p>
            <p>
              What you become is entirely up to you-- a feared blackhat hacker
              doing ddos attacks, a basement dweller with a ledger full of
              cryptocurrency, a cyber security specialist with datacenters all
              over the globe, or maybe you'll make it to the top and become a
              part of the legendary Anonymous.
            </p>
          </div>
          <Container className="p-0">
            <Row className="d-flex h-100 justify-content-around">
              <Col md="5" sm="12" className="p-0">
                <Login />
              </Col>
              <Col md="5" sm="12" className="p-0">
                <Signup redirect={redirect} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="hackVideoesContainer">
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
