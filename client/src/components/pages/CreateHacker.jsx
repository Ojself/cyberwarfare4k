import React, { useState, useEffect } from "react";
import api from "../../api";
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

const CreateHacker = () => {
  const [createState, setCreateState] = useState({
    loading: true,
    message: null,
    user: null,
    success: true,
    selectedOption:null,
    name: "",
    city: ""
  });

  useEffect(() => {
    api
      .getUser()
      .then(result => {
        setCreateState({
          ...createState,
          message: result.message,
          loading: false,
          user: result.user
        });

        setTimeout(() => {
          setCreateState({
            ...createState,
            message: null
          });
        }, 2000);
      })
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = e => {
    setCreateState({
      ...createState,
      [e.target.name]: e.target.value
    });
  };

  const handleRadioChange = e => {
  setCreateState({...createState,
    selectedOption: e.target.value
  });
};

  const handleClick = e => {
    e.preventDefault();
    const data = {
      name: createState.name,
      cityString: createState.city
    };
    api
      .createUser(data)
      .then(result => {
        console.log("SUCCESS!");
        setCreateState({
          ...createState,
          message: `Your user '${createState.name}' has been created`
        });
        setTimeout(() => {
          setCreateState({
            ...createState,
            message: ""
          });
        }, 2000);
      })
      .catch(err =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  const handleUpgrade = e => {
    e.preventDefault();
    console.log(e.target.name, "e.target");
    const data = e.target.name;
    api
      .upgradeStats(data)
      .then(result => {
        console.log("SUCCESS!", result);
        /* make screen blink green? */
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

  return (
    <div className="w-50">
    <div>
    <h1>Create A Haxx0r</h1>
    </div>
    {/* Name */}
    <div>
    <Form>
     <FormGroup>
        <Label for="name"></Label>
        <Input value={createState.name}
        
          name="name"
          onChange={handleInputChange} placeholder="Name" invalid/>
        <FormFeedback invalid>Your character name requires</FormFeedback>
        <FormFeedback invalid>- more than 3 characters</FormFeedback>
        <FormFeedback invalid>- not more than 15 characters</FormFeedback>

      </FormGroup>
    </Form>
    </div>
    {/* Set Your Skills */}
    <div >
    <h3>Set Your Skills</h3>
    {/* actual skills */}

    <div className="row">
    <div id="createHackerFirewall" className="col-md-6"><Button color="primary" size="s" active>+</Button>Firewall</div>
    <div id="createHackerCpu" className="col-md-6"><Button color="primary" size="s" active>+</Button> CPU</div>
    </div>
    <div className="row">
    <div id="createHackerEncryption" className="col-md-6"><Button color="primary" size="s" active>+</Button> Encryption</div>
    <div id="createHackerAvs" className="col-md-6"><Button color="primary" size="s" active>+</Button> AVS</div>
    </div>
    </div>
     <UncontrolledTooltip placement="right" target="createHackerFirewall">
        Max health
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="right" target="createHackerEncryption">
        Block skill
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="left" target="createHackerCpu">
        Attack skill
      </UncontrolledTooltip>
      <UncontrolledTooltip placement="left" target="createHackerAvs">
        Defense skill
      </UncontrolledTooltip>
{/* City select */}
<h3>Select Your City</h3>
<Form>
      <FormGroup>
         <Label for="selectCity"></Label>
        <Input type="select" name="select" id="selectCity">
          <option>Phoenix</option>
          <option>Stavanger</option>
          <option>Shanghai</option>
          <option>Hanoi</option>
          <option>Novosibirsk</option>
        </Input>
      </FormGroup>
      </Form>
      {/* Avatars */}
      <h3>Select Your Avatar</h3>
      <div className="d-flex justify-content-center flex-wrap">
      
      {images.playerAvatars.map((el,i)=>
      
    <label className="d-flex flex-column">
      <img className="avatarSelectImages m-4" src={el.src} alt={el.title} />
      <input
        className=""
        type="radio"
        name={`avatar${i}`}
        value={`option${i}`}
        checked={createState.selectedOption === `option${i}`}
        onChange={handleRadioChange}
      />
    </label>

        
      )}
      </div>

       


      <Button color="primary" size="lg">Create!</Button>
          </div>
  );
};
export default CreateHacker;





/* 

<div style={{height:'100vh'}} className="">
      <h2>Create a haxor</h2>
      <form>
        Name:{" "}
        <input
          type="text"
          value={createState.name}
          name="name"
          onChange={handleInputChange}
        />{" "}
        <br />
        <h2>
          Statpoints:{" "}
          {createState.loading ? 0 : createState.user.playerStats.statPoints}
        </h2>
        CPU:{" "}
        <button name="cpu" onClick={handleUpgrade}>
          CPU
        </button>
        <button name="Antivirus" onClick={handleUpgrade}>
          AVS
        </button>
        <button name="Encryption" onClick={handleUpgrade}>
          Encryption
        </button>
        <br />
        city:{" "}
        <input
          type="text"
          value={createState.city}
          name="city"
          onChange={handleInputChange}
        />{" "}
        <br />
        <br />
        <br />
        <button onClick={e => handleClick(e)}>Create haxor</button>
      </form>
      {createState.message && <div className="info">{createState.message}</div>}
    </div>
 */