import React, { useState, useEffect } from "react";
import api from "../../../api";
import Select from "react-select";
import images from "../_helpers/images.js";
import "./createStyle.scss";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

const CreateHacker = (props) => {
  const [createState, setCreateState] = useState({
    message: '',
    selectedCity: '',
    selectedAvatar: '',
    name: '',
  });
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    setActiveTab(Math.ceil(Math.random() * 8) + "");
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
    console.log(e.target.name);
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
      .then((result) => {
        console.log(result, "result");
        window.location.pathname = "/my-profile";
      })
      .catch((err) =>
        setCreateState({ ...createState, message: err.toString() })
      );
  };

  const createButtonEnabled = () => {
    return (
      !createState.selectedAvatar ||
      !createState.selectedCity ||
      !createState.name ||
      createState.name.length < 3
    );
  };

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
    "NCIS",
    "Misc",
    "Mr. Robot",
    "Anon",
  ];
  const avatarTabs = (
    <div>
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
              <Row>
                <Col>
                  <h4>{tabContent}</h4>
                  {images.playerAvatars[i].map((a, i) => (
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
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );

  return (
    <div className="page-container">
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
          <div
            style={{ margin: "0 auto", width: "65%" }}
            className="d-flex justify-content-center flex-wrap"
          >
            {avatarTabs}
          </div>
          <Button
            disabled={createButtonEnabled()}
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
