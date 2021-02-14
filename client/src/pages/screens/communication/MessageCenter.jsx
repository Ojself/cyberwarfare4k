import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../../api";
import { Link } from "react-router-dom";
import {
  Container,
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

import Tutorial from "../_molecules/Tutorial";

const AllianceInvitation = ({ answerAllianceInvitation }) => {
  <div className="d-flex justify-content-around flex-row">
    <Button
      onClick={() => answerAllianceInvitation(allianceInvitation, false)}
      color="danger"
    >
      Decline
    </Button>
    <Button
      onClick={() => answerAllianceInvitation(allianceInvitation, true)}
      color="success"
    >
      Accept
    </Button>
  </div>;
};

const MessageCenter = ({ updateGlobalValues, globalLoading, user }) => {
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [textArea, setTextArea] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleChange = (eventValue) => {
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
    const user = users.find((u) => u.label === userName);
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
    const getMessages = async () => {
      let data = await api.getMessages();
      setMessages(data.messages);
    };
    const fetchHackerNames = async () => {
      const data = await api.getHackerNames();
      const { users } = data;
      const massagedUsers = dataMassager(users);

      await setUsers(massagedUsers);
      setAutoComposeTo(window.location.pathname, users);
      setLoading(false);
    };
    getMessages();
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

  const answerAllianceInvitation = async (id, answer) => {
    let data;
    try {
      data = await api.answerAllianceInvitation(id, answer);
    } catch (err) {
      console.error(err, "error");
      updateGlobalValues(err, true, true);
      return;
    }
    updateGlobalValues(data, true, true, data.inbox);
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
    <Container fluid className="page-container">
      <Row>
        <Col className="d-flex justify-content-center">
          <h1>MessageCenter</h1>
          <Tutorial section="Messages" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col md="12" lg="10">
          <Nav tabs>
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
        </Col>
      </Row>
      <TabContent className="" activeTab={activeTab}>
        <TabPane tabId="1">
          <Row className="d-flex justify-content-center">
            <Col md="12" lg="10">
              <ListGroup>
                {globalLoading ? (
                  "loading.."
                ) : messages.inbox && messages.inbox.length ? (
                  messages.inbox.map((m, i) => {
                    const name = m.from.name;
                    const id = m.from._id;
                    const date = m.dateSent;
                    const read = m.read;
                    const message = m.text;
                    let allianceInvitation = m.allianceInvitation;

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
                        <ListGroupItemText className="mb-4">{`${date}: ${message}`}</ListGroupItemText>
                        <div className="d-flex justify-content-center flex-column">
                          {allianceInvitation ? (
                            <AllianceInvitation
                              answerAllianceInvitation={
                                answerAllianceInvitation
                              }
                            />
                          ) : (
                            <Button
                              className="w-25 m-auto"
                              onClick={() => {
                                handleReply(name);
                              }}
                            >
                              Reply
                            </Button>
                          )}
                        </div>
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
          <Row className="d-flex justify-content-center">
            <Col md="12" lg="10">
              <ListGroup>
                {globalLoading ? (
                  "loading.."
                ) : messages.sent && messages.sent.length ? (
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
          <Row className="d-flex justify-content-center">
            <Col md="12" lg="10">
              <Card body>
                <Form>
                  <Select
                    className="text-dark w-50 mb-5 m-auto"
                    value={selectedOption}
                    onChange={handleChange}
                    options={loading ? "" : users}
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
    </Container>
  );
};

export default MessageCenter;
