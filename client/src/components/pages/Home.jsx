import React, { useState, useEffect } from "react";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
// import api from "../../api";

const Home = () => {
  const [homeState, setHomeState] = useState({
    name: ""
  });

  const cards = (path,name,link) => (<Card>
        <CardImg top width="100%" src={path} alt="IMAGE DESCRIPTION" />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>)



  return (
    <div>
      {cards('path','name','link')}
    </div>
  );
};
  

export default Home;
