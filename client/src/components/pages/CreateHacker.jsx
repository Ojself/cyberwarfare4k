import React, { useState, useEffect } from "react";
import api from "../../api";
import Select from "react-select";
import images from '../utils/images.js'

import { 
  Form, 
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
  UncontrolledTooltip
} from 'reactstrap';

const CreateHacker = props => {
  const [createState, setCreateState] = useState({
    message: null,
    selectedCity:null,
    selectedAvatar: null,
    name: null,
    
  });

  useEffect(() => {
    
  }, [console.log(createState,'state')]);

  //todo, create something that handles invalid name
  //todo, check statpoints

  const handleSelectChange = selectedCity => {
    setCreateState({ ...createState, selectedCity });
  };

  const handleInputChange = e => {
    console.log(e.target.name,'e')
    setCreateState({
      ...createState,
      [e.target.name]: e.target.value
    });
  };
  
  const selectAvatar = e => {
    let avatar = e.target.name || null
    if (createState.selectedAvatar == avatar){
      avatar = null
    }
    console.log(avatar,'avatar')
    e.preventDefault();
    setCreateState({
      ...createState,
      selectedAvatar: avatar
    });
  };

    const handleCreate = e => {
    e.preventDefault();
    const data = {
      name: createState.name,
      cityString: createState.selectedCity.value,
      avatar: createState.selectedAvatar
    };
    api
      .createUser(data)
      .then(result => {
        console.log("SUCCESS!");
        console.log(result,'result')
      })
      .catch(err =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  const handleUpgrade = e => {
    console.log('handleupgrade')
    e.preventDefault();
    console.log(e.target.name, "e.target");
    const data = e.target.name;
    api
      .upgradeStats(data)
      .then(result => {
        console.log("SUCCESS!", result);
        /* todo make screen blink green? */
        setCreateState({
          ...createState,
          message: `${result.message}`
        });
        setTimeout(() => {
          setCreateState({
            ...createState,
            message: null
          });
        }, 2000);
      })
      .catch(err =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  const cities = [
    {value: 'Phoenix', label: 'Phoenix'},
    {value: 'Hanoi', label: 'Hanoi'},
    {value: 'Stavanger', label: 'Stavanger'},
    {value: 'Novosibirsk', label: 'Novosibirsk'},
    {value: 'Shanghai', label: 'Shanghai'}
  ]

  return (
    <div style={{'marginTop':'-50px'}} className="w-100 d-flex justify-content-center">
    <div className="w-50">
    <div className="">
    <h1>Create A Haxx0r</h1>
    </div>

    {/* Name */}
    <div className="mb-5">
    
    <Form className="d-flex justify-content-center ">
     <FormGroup className="">
        <Label  for="name"></Label>
        <Input maxlength={15} value={createState.name}
        
          name="name"
          onChange={handleInputChange} placeholder="Name" />
        <FormFeedback invalid>Your character name requires</FormFeedback>
        <FormFeedback invalid>- more than 3 characters</FormFeedback>
        <FormFeedback invalid>- not more than 15 characters</FormFeedback>

      </FormGroup>
    </Form>
    </div>
    {/* Set Your Skills */}
    <div className="d-flex flex-column mb-5">
    <h3>Set Your Skills</h3>
    {/* actual skills */}
    <h4>Statpoints: <span style={{'color':'red'}}>{props.loading?'5':props.user.playerStats.statPoints}</span> </h4>
    <div className="d-flex justify-content-center justify-content-around row w-100 ">
    <div id="createHackerFirewall" className=""><Button name="firewall" onClick={handleUpgrade} color="primary" size="s" active>+</Button> Firewall</div>
    <div id="createHackerCpu" className=""><Button name="cpu" onClick={handleUpgrade} color="primary" size="s" active>+</Button> CPU</div>
    
    
    <div id="createHackerEncryption" className=""><Button name="encryption" onClick={handleUpgrade} color="primary" size="s" active>+</Button> Encryption</div>
    <div id="createHackerAvs" className=""><Button name="antivirus" onClick={handleUpgrade} color="primary" size="s" active>+</Button> AVS</div>
    </div>
    </div>
     <UncontrolledTooltip placement="bottom" target="createHackerFirewall">
        Max health
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="bottom" target="createHackerEncryption">
        Block skill
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="bottom" target="createHackerCpu">
        Attack skill
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="bottom" target="createHackerAvs">
        Defense skill
      </UncontrolledTooltip>
{/* City select */}
<div className="mb-5">
<h3>Select Your City</h3>

      <Select
      className="text-dark w-25 m-auto"
                  value={createState.selectedCity}
                  onChange={handleSelectChange}
                  options={cities}
                />
      </div>
      {/* Avatars */}
      <h3>Select Your Avatar</h3>
      <div className="d-flex justify-content-center flex-wrap">
      
      {images.playerAvatars.map((el,i)=>
      <img key={el.src} name={el.src} onClick={selectAvatar}className={createState.selectedAvatar==el.src ? "avatarSelectImages m-4 active":"avatarSelectImages m-4"} src={el.src} alt={el.title} />    
      )}
      </div>
      <Button disabled={!createState.selectedAvatar || !createState.selectedCity || !createState.name }  className="m-5 p-3" onClick={handleCreate} color="primary" size="lg">Create!</Button>
          </div>
          </div>
  );
};
export default CreateHacker;