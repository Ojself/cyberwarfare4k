import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../../api";
import Typist from "react-typist";
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

const MessageCenter = (props) => {
  const [globalInfo, setGlobalInfo] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [textArea, setTextArea] = useState("");

  const toggle = (tab) => {
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
    }); // todo, this does not work
    toggle("3");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .sendMessage({
        text: textArea,
        receiverId: selectedOption.value,
      })
      .then((result) => {
        console.log(result, "sending");
        setTextArea("");
        setSelectedOption("");
        setGlobalInfo(
          <Typist className="" cursor={{ show: false }}>
            <span> {result.message.toLowerCase()} </span>
          </Typist>
        );
      });

    setTimeout(() => {
      setGlobalInfo("");
    }, 5000);
  };

  useEffect(() => {
    api.getHackerNames().then((result) => {
      const { users } = result;
      const massagedUsers = dataMassager(users);

      setUsers(massagedUsers);
      setLoading(false);
      readAllCommunication();
    });
  }, []);

  const readAllCommunication = async () => {
    await api.readAllCommunication("messages");
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
      <h6
        className="text-left"
        style={{ margin: "0 auto", width: "20%", minHeight: "20px" }}
      >
        {globalInfo}
      </h6>
      <h1>MessageCenter</h1>
      <div className="content d-flex flex-column w-50 ">
        <Nav tabs className="">
          {["Inbox", "Sent", "Compose"].map((t, i) => {
            return (
              <NavItem>
                <NavLink
                  className={classnames({
                    active: activeTab === i + 1 + "",
                  })}
                  onClick={() => {
                    toggle(i + 1 + "");
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
                  {props.loading
                    ? "loading.."
                    : props.user.account.messages.map((m, i) => {
                        const name = m[0].split(" ")[0];
                        const id = getId(name);

                        const message = m[0].split(" ").slice(1).join(" ");
                        const unread = m[1];
                        const inboxClass = unread
                          ? "mt-2 text-light"
                          : "mt-2 text-dark";

                        return (
                          <ListGroupItem
                            className={inboxClass}
                            active={unread}
                            key={i}
                          >
                            <ListGroupItemHeading>
                              From:{" "}
                              <NavLink href={`/hacker/${id}`}>{name}</NavLink>
                            </ListGroupItemHeading>
                            <ListGroupItemText>{message}</ListGroupItemText>
                            <Button
                              onClick={() => {
                                handleReply(m[0].split(" ")[0]);
                              }}
                            >
                              Reply
                            </Button>
                          </ListGroupItem>
                        );
                      })}
                </ListGroup>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
                <ListGroup>
                  {props.loading
                    ? "loading.."
                    : props.user.account.sentMessages.map((m, i) => {
                        const name = m[0].split(" ")[0];
                        const id = getId(name);
                        const message = m[0].split(" ").slice(1).join(" ");
                        return (
                          <ListGroupItem className="mt-2" key={i}>
                            <ListGroupItemHeading className="text-dark">
                              To:{" "}
                              {<NavLink href={`/hacker/${id}`}>{name}</NavLink>}
                            </ListGroupItemHeading>
                            <ListGroupItemText className="text-dark">
                              {message}
                            </ListGroupItemText>
                          </ListGroupItem>
                        );
                      })}
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
                      options={loading ? "" : users}
                    />
                    <FormGroup className="text-dark">
                      <Label for="messageText">Message</Label>
                      <Input
                        maxLength={250} /* .substr(0,250) */
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
