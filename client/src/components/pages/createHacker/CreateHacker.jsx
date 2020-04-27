import React, { useState, useEffect } from "react";
import api from "../../../api";
import Select from "react-select";
import images from "../_helpers/images.js";

import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
} from "reactstrap";

const CreateHacker = (props) => {
  const [createState, setCreateState] = useState({
    message: null,
    selectedCity: null,
    selectedAvatar: null,
    name: null,
  });

  useEffect(() => {
    redirectToCorrectPage().then((result) => {});
  }, []);

  const redirectToCorrectPage = async () => {
    const reDirectInformation = await api.getRedirectInfo();
    const status = reDirectInformation.status;

    if (status.userInstance && status.isSetup) {
      window.location.pathname = "/my-profile";
      return;
    }
    if (!status.userInstance) {
      window.location.pathname = "/";
      return;
    }

    return false;
  };

  //todo, create something that handles invalid name
  //todo, check statpoints

  const handleSelectChange = (selectedCity) => {
    setCreateState({ ...createState, selectedCity });
  };

  const handleInputChange = (e) => {
    console.log(e.target.name, "e");
    setCreateState({
      ...createState,
      [e.target.name]: e.target.value,
    });
  };

  const selectAvatar = (e) => {
    let avatar = e.target.name || null;
    if (createState.selectedAvatar === avatar) {
      avatar = null;
    }
    e.preventDefault();
    setCreateState({
      ...createState,
      selectedAvatar: avatar,
    });
  };

  /* 
  const handleClick = (e) => {
    e.preventDefault();
    api
      .login(loginState.email, loginState.password)
      .then((result) => {
        props.redirect("/my-profile/");
      })
      .catch((err) =>
        setLoginState({ ...loginState, message: err.toString() })
      );
  }; */

  const handleCreate = (e) => {
    e.preventDefault();
    const data = {
      name: createState.name,
      cityString: createState.selectedCity.value,
      avatar: createState.selectedAvatar,
    };
    api
      .createUser(data)
      .then((result) => {
        console.log(result, "result");
        window.location.pathname = "/my-profile";
      })
      .catch((err) =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  const cities = [
    { value: "Phoenix", label: "Phoenix" },
    { value: "Hanoi", label: "Hanoi" },
    { value: "Stavanger", label: "Stavanger" },
    { value: "Novosibirsk", label: "Novosibirsk" },
    { value: "Shanghai", label: "Shanghai" },
  ];

  return (
    <div style={{ marginTop: "-100px" }} className="page-container">
      {
        <div className="content">
          <div className="">
            <h1>Create A Haxx0r</h1>
          </div>

          <div className="mb-5">
            <Form className="d-flex justify-content-center ">
              <FormGroup className="">
                <Label for="name"></Label>
                <Input
                  maxLength={15}
                  value={createState.name}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Name"
                />
                <FormFeedback invalid>
                  Your character name requires
                </FormFeedback>
                <FormFeedback invalid>- more than 3 characters</FormFeedback>
                <FormFeedback invalid>
                  - not more than 15 characters
                </FormFeedback>
              </FormGroup>
            </Form>
          </div>

          <div className="mb-5">
            <h3>Select Your City</h3>

            <Select
              className="text-dark w-25 m-auto"
              value={createState.selectedCity}
              onChange={handleSelectChange}
              options={cities}
            />
          </div>

          <h3>Select Your Avatar</h3>
          <div className="d-flex justify-content-center flex-wrap">
            {images.playerAvatars.map((el, i) => (
              <img
                key={el.src}
                name={el.src}
                onClick={selectAvatar}
                className={
                  createState.selectedAvatar === el.src
                    ? "avatarSelectImages m-4 active"
                    : "avatarSelectImages m-4"
                }
                src={el.src}
                alt={el.title}
              />
            ))}
          </div>
          <Button
            disabled={
              !createState.selectedAvatar ||
              !createState.selectedCity ||
              !createState.name
            }
            className="m-5 p-3"
            onClick={handleCreate}
            color="primary"
            size="lg"
          >
            Create!
          </Button>
        </div>
      }
    </div>
  );
};
export default CreateHacker;
