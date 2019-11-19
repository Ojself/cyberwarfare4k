import React, { useState, useEffect } from "react";
import Select from "react-select";
import api from "../../api";
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
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";

const MessageCenter = props => {
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleChange = selectedOption => {
    setSelectedOption({ selectedOption });
  };

  useEffect(() => {
    api.getHackerNames().then(result => {
      console.log(result, "result");
      const { users } = result;
      const massagedUsers = dataMassager(users);

      setUsers(massagedUsers);
      setMessage(null); // wrong
      setLoading(false);
    });
  }, []);

  const dataMassager = userArray => {
    const massagedUsers = [];
    userArray.forEach(u => {
      massagedUsers.push({
        value: u._id,
        label: u.name
      });
    });
    return massagedUsers;
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Inbox
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Sent
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Compose
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Inbox </CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Sent</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Compose</CardTitle>
                <Form>
                  {/* SELECT HERE */}
                  <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={loading ? "" : users}
                  />
                  <FormGroup>
                    <Label for="messageText">Message</Label>
                    <Input
                      maxLength={250} /* .substr(0,250) */
                      required={true}
                      type="textarea"
                      name="text"
                      id="messageText"
                    />
                  </FormGroup>
                </Form>
                <Button>Send!</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default MessageCenter;
