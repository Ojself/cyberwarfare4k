import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../../api";
import { Link } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";
import classnames from "classnames";

// todo message sent feedback
// ban people for spamming
// alternate background color for easier reading
// todo, linking color of names

const MessageCenter = ({ updateGlobalValues, globalLoading, messages }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [textArea, setTextArea] = useState("");

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleChange = (eventValue) => {
    console.log(eventValue);
    setSelectedOption(eventValue);
  };

  const handleReply = (name) => {
    const userId = getId(name);
    setSelectedOption({
      value: userId,
      label: name,
    });
    toggleTab("3");
  };
  const getId = (userName) => {
    if (!users.length || userName.toLowerCase() === "system") {
      return "";
    }
    const user = users.find((u) => {
      return u.label === userName;
    });
    return user.value;
  };

  const handleTextAreaChange = (e) => {
    setTextArea(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      data = await api.sendMessage({
        text: textArea,
        receiverId: selectedOption.value,
      });
    } catch (err) {
      updateGlobalValues(err);
      return;
    }
    updateGlobalValues(data);
    setTextArea("");
    setSelectedOption("");
  };

  useEffect(() => {
    const fetchHackerNames = async () => {
      const data = await api.getHackerNames();
      const { users } = data;
      const massagedUsers = dataMassager(users);

      await setUsers(massagedUsers);
      setLoadingUsers(false);
      await api.readAllCommunication("messages");
      setAutoComposeTo(window.location.pathname, users);
    };
    fetchHackerNames();
  }, []);

  const setAutoComposeTo = (path, users) => {
    if (!path.includes("=")) {
      return;
    }
    const to = path.split("=")[1];
    const foundUser = users.find((user) => user._id === to);
    if (foundUser) {
      const userData = {
        label: foundUser.name,
        value: foundUser._id,
      };
      setActiveTab("3");
      setSelectedOption(userData);
    }
  };

  const getDisabledSendButton = () => {
    const criterias =
      textArea.length > 0 &&
      textArea.length < 255 &&
      selectedOption &&
      selectedOption.value;
    return !criterias;
  };

  const dataMassager = (userArray) => {
    const massagedUsers = [];
    userArray.forEach((u) => {
      massagedUsers.push({
        value: u._id,
        label: u.name,
      });
    });
    return massagedUsers;
  };

  return (
    <div className="page-container">
      <h1>MessageCenter</h1>
      <div className="content d-flex flex-column w-50 ">
        <Nav tabs className="">
          {["Inbox", "Sent", "Compose"].map((t, i) => {
            return (
              <NavItem key={i}>
                <NavLink
                  className={classnames({
                    active: activeTab === i + 1 + "",
                  })}
                  onClick={() => {
                    toggleTab(i + 1 + "");
                  }}
                >
                  {t}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent className="" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col>
                <ListGroup>
                  {globalLoading ? (
                    "loading.."
                  ) : messages.inbox.length ? (
                    messages.inbox.map((m, i) => {
                      const name = m.from.name;
                      const id = m.from._id;
                      const date = m.dateSent;
                      const read = m.read;
                      const message = m.text;

                      const inboxClass = read
                        ? "mt-2 text-light"
                        : "mt-2 bg-light text-dark";

                      return (
                        <ListGroupItem
                          className={inboxClass}
                          active={!read}
                          key={i}
                        >
                          <ListGroupItemHeading>
                            From:{" "}
                            <Link className={inboxClass} to={`/hacker/${id}`}>
                              {name}
                            </Link>
                          </ListGroupItemHeading>
                          <ListGroupItemText>{`${date}: ${message}`}</ListGroupItemText>
                          <Button
                            onClick={() => {
                              handleReply(name);
                            }}
                          >
                            Reply
                          </Button>
                        </ListGroupItem>
                      );
                    })
                  ) : (
                    <p>Your inbox is empty</p>
                  )}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <ListGroup>
                  {globalLoading ? (
                    "loading.."
                  ) : messages.sent.length ? (
                    messages.sent.map((m, i) => {
                      const name = m.to.name;
                      const id = m.to._id;
                      const date = m.dateSent;
                      const message = m.text;

                      return (
                        <ListGroupItem className="mt-2 text-warning" key={i}>
                          <ListGroupItemHeading className="text-warning">
                            To: {<Link to={`/hacker/${id}`}>{name}</Link>}
                          </ListGroupItemHeading>
                          <ListGroupItemText className="">
                            {`${date}: ${message}`}
                          </ListGroupItemText>
                        </ListGroupItem>
                      );
                    })
                  ) : (
                    <p>Your sent folder is empty</p>
                  )}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col>
                <Card body>
                  <Form>
                    <Select
                      className="text-dark w-50 mb-5"
                      value={selectedOption}
                      onChange={handleChange}
                      options={loadingUsers ? "" : users}
                    />
                    <FormGroup className="text-dark">
                      <Label for="messageText">Message</Label>
                      <Input
                        maxLength={250}
                        value={textArea}
                        onChange={handleTextAreaChange}
                        required={true}
                        type="textarea"
                        name="text"
                        id="messageText"
                      />
                    </FormGroup>
                    <Button
                      disabled={getDisabledSendButton()}
                      onClick={handleSubmit}
                    >
                      Send!
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

export default MessageCenter;
