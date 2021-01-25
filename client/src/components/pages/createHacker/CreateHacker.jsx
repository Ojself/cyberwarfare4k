import React, { useState, useEffect } from "react";
import api from "../../../api";
import Select from "react-select";
import images from "../_helpers/images.js";
import "./createStyle.scss";

import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

const cities = [
  { value: "Phoenix", label: "Phoenix" },
  { value: "Hanoi", label: "Hanoi" },
  { value: "Stavanger", label: "Stavanger" },
  { value: "Novosibirsk", label: "Novosibirsk" },
  { value: "Shanghai", label: "Shanghai" },
];
const avatarCategories = [
  "Catz",
  "irl",
  "Matrix",
  "Waifu",
  "Hollywood",
  "Misc",
  "Mr. Robot",
  "Anon",
];

const CreateHacker = () => {
  const [createState, setCreateState] = useState({
    message: "",
    selectedCity: "",
    selectedAvatar: "",
    name: "",
    playerIsDead: false,
  });

  const [activeTab, setActiveTab] = useState("1");
  const [userNames, setUserNames] = useState([]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(Math.ceil(Math.random() * 8) + "");
    redirectToCorrectPage().then((result) => {});
  }, []);

  const redirectToCorrectPage = async () => {
    const reDirectInformation = await api.getRedirectInfo();
    const { status } = reDirectInformation;

    if (status.userInstance && status.isSetup) {
      window.location.pathname = "/my-profile";
      return;
    }
    if (!status.userInstance) {
      window.location.pathname = "/";
      return;
    }

    if (status.playerIsDead) {
      setCreateState({
        ...createState,
        playerIsDead: true,
      });
    }

    return false;
  };

  const handleSelectChange = (selectedCity) => {
    setCreateState({ ...createState, selectedCity });
  };

  const handleInputChange = (e) => {
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

  const handleCreate = (e) => {
    e.preventDefault();
    const data = {
      name: createState.name,
      cityString: createState.selectedCity.value,
      avatar: createState.selectedAvatar,
    };
    api
      .createUser(data)
      .then((result) => (window.location.pathname = "/my-profile"))
      .catch((err) => {
        console.error("error: ", err);
        setCreateState({ ...createState, message: err.toString() });
      });
  };

  const createButtonEnabled = () => {
    return (
      !createState.selectedAvatar ||
      !createState.selectedCity ||
      !createState.name ||
      createState.name.length > 15
    );
  };

  const avatarTabs = (
    <>
      <h1 className="display-4">Select Your Avatar</h1>
      <div
        style={{ margin: "0 auto", width: "100%" }}
        className="d-flex justify-content-center flex-wrap"
      >
        <Nav className="justify-content-center" tabs>
          {avatarCategories.map((a, i) => {
            return (
              <NavItem key={a}>
                <NavLink
                  className={classnames({
                    active: activeTab === i + 1 + "",
                  })}
                  onClick={() => {
                    toggle(i + 1 + "");
                  }}
                >
                  {a}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={activeTab}>
          {avatarCategories.map((tabContent, i) => {
            return (
              <TabPane key={tabContent} tabId={i + 1 + ""}>
                <Container>
                  <Row>
                    <Col>
                      <h4>{tabContent}</h4>
                      {images.playerAvatars[i].map((a) => (
                        <img
                          key={a.src}
                          name={a.src}
                          onClick={selectAvatar}
                          className={
                            createState.selectedAvatar === a.src
                              ? "selectedAvatarImage m-4 "
                              : "avatarSelectImages m-4"
                          }
                          src={a.src}
                          alt={a.title}
                        />
                      ))}
                    </Col>
                  </Row>
                </Container>
              </TabPane>
            );
          })}
        </TabContent>
      </div>
    </>
  );

  const nameForm = (
    <div className="my-3">
      <h1 className="display-4">Create A Haxx0r</h1>
      <Form className="d-flex justify-content-center">
        <FormGroup className="w-100">
          <Label for="name"></Label>
          <Input
            maxLength={15}
            value={createState.name}
            name="name"
            onChange={handleInputChange}
            placeholder="Name"
          />
        </FormGroup>
      </Form>
    </div>
  );

  const playerDeadFeedBack = (
    <div className="text-danger my-3">
      <h4>YOU DIED!</h4>
      <p>You were shutdown by an enemy. Create a new hacker and fight back!</p>
    </div>
  );

  const selectCityForm = (
    <div className="mb-5">
      <h1 className="display-4">Select Your City</h1>
      <Select
        className="text-dark"
        onChange={handleSelectChange}
        options={cities}
      />
    </div>
  );
  const createHackerButton = (
    <Button
      disabled={createButtonEnabled()}
      className="mt-5 p-3 w-100"
      onClick={handleCreate}
      color="primary"
    >
      Create!
    </Button>
  );

  const CreateHackerFeedback = ({ success, msg }) => {
    const failIcon = "far fa-times-circle";
    const successIcon = "fas fa-check";

    return (
      <p
        style={{ fontSize: "0.75rem" }}
        className={`my-1 text-${success ? "success" : "danger"}`}
      >
        <i className={success ? successIcon : failIcon}></i> {msg}
      </p>
    );
  };

  return (
    <Container>
      <Row
        className="d-flex flex-column justify-content-center align-items-center"
        xs="1"
      >
        <Col sm="12" md="8">
          {createState.playerIsDead && playerDeadFeedBack}
        </Col>

        <Col sm="12" md="6">
          {nameForm}
        </Col>

        <Col sm="12" md="6">
          {selectCityForm}
        </Col>

        <Col sm="12" md="8">
          {avatarTabs}
        </Col>

        <Col sm="10" md="4">
          {createHackerButton}
          <CreateHackerFeedback
            success={createState.name && createState.name.length < 15}
            msg={"Enter a name"}
          />
          <CreateHackerFeedback
            success={createState.selectedCity}
            msg={"Chose a city"}
          />
          <CreateHackerFeedback
            success={createState.selectedAvatar}
            msg={"Pick an avatar"}
          />
        </Col>
      </Row>
    </Container>
  );
};
export default CreateHacker;
