import React, {useEffect, useState} from 'react';
import api from "../../api";
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, InputGroup,InputGroupAddon, Input,InputGroupText
} from 'reactstrap';


const URLS = {
  chw4k:"https://github.com/Ojself/cyberwarfare4k",
  megarpg: "https://discord.com/invite/DZXZzC3",
  chessathor: "http://chessathor2.flesjoe.com/",
}

const styles = {
  ghimg: {
    margin:"auto",
    maxWidth:"10vw"
  },
  defaultImg:{
    margin: "auto"
  },
  cardBody:{
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  }
}


const EarnBattery = ({user,loading,updateGlobalValues}) => {

  const handleGenerate = async event=> {
    const game = event.target.name
    const data = await api.createBatteryQuery(game)
    updateGlobalValues(data)
  }

  const icons = {
    fail: (<i className="far fa-times-circle"></i>),
    success: (<i className="fas fa-check"></i>)
  }


  const userHasGithub = loading || !!user.earnBattery.githubUserName
  const userHasStarred = loading ? false : user.earnBattery.githubStar

  const getButton = (game)=> {
    let disabled = true
    let innerText;
    if (loading || (!user.earnBattery[game].code && user.earnBattery[game].expires > Date.now())){
      disabled = false
      innerText = 'Generate code'
    }else if (user.earnBattery[game].code){
      innerText = user.earnBattery[game].code
    } else if (user.earnBattery[game].expires > Date.now()){
      innerText =  'You have to wait'
    } else {
      disabled = false
      innerText = 'Generate code!'
    }
    return <Button name={game} disabled={disabled} onClick={(e)=> handleGenerate(e)}>{innerText}</Button>
  }
  const githubUsernameInput = (
    !loading && (
    <InputGroup>
        <Input disabled={userHasGithub} placeholder={userHasGithub ? user.earnBattery.githubUserName : "Github username"} />
        {userHasGithub ? <InputGroupText title="Please allow 1 hour after starring the project for the bonus to take effect">{userHasStarred ? icons.success: icons.fail} </InputGroupText> : <InputGroupAddon addonType="append"><Button>Submit</Button></InputGroupAddon>}
      </InputGroup>)
  )
  const cardDeck=(
<CardDeck className="text-dark">
      <Card className="d-flex justify-content-center">
        <CardImg top style={styles.ghimg} src="/earnBatteryPics/github_dark.png" alt="Card image cap" />
        <CardBody style={styles.cardBody}>
          <CardTitle tag="h5">Star the game!</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Hourly bonus <span>&#9889;</span></CardSubtitle>
          <CardText>Type in your github username and star the <a target="_blank" rel="noopener noreferrer" href={URLS.chw4k}>CyberHackerWarfare4K</a> project at Github to receive an  hourly battery bonus!</CardText>
          {githubUsernameInput}
        </CardBody>
      </Card>
      <Card>
        <CardImg top style={styles.defaultImg}src="/earnBatteryPics/discord.png" alt="Card image cap" />
        <CardBody style={styles.cardBody}>
          <CardTitle  tag="h5">MEGA rpg</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">10 <span>&#9889;</span></CardSubtitle>
          <CardText>Join the <a target="_blank" rel="noopener noreferrer" href={URLS.megarpg}>MEGA rpg</a> Discord server and type !hack 'code' </CardText>
          {getButton('megarpg')}
        </CardBody>
      </Card>
      <Card>
        <CardImg top style={styles.defaultImg}src="/earnBatteryPics/chess.png" alt="Card image cap" />
        <CardBody style={styles.cardBody}>
          <CardTitle  tag="h5">Chessathor</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">15 <span>&#9889;</span></CardSubtitle>
          <CardText> Play through 22 levels of <a target="_blank" rel="noopener noreferrer" href={URLS.chessathor}>Chessathor</a> and input the 'code' to receive the battery bonus! </CardText>
          {getButton('chessathor')}
        </CardBody>
      </Card>
    </CardDeck>
  )
  return (
    <div className="container">
      {cardDeck}
    </div>
  );
};

export default EarnBattery;