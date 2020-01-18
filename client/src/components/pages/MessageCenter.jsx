import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../../api';
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
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import classnames from 'classnames';

const MessageCenter = props => {
  const [activeTab, setActiveTab] = useState('1');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [textArea, setTextArea] = useState('');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const handleChange = eventValue => {
    setSelectedOption(eventValue);
  };

  const handleReply = name => {
    toggle('3');
    setSelectedOption('npc'); // todo, this does not work
  };

  const handleTextAreaChange = e => {
    setTextArea(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    api
      .sendMessage({
        text: textArea,
        receiverId: selectedOption.value
      })
      .then(result => {
        console.log(result, 'result');
        setTextArea('');
        setSelectedOption('');
      });
  };

  useEffect(() => {
    api.getHackerNames().then(result => {
      console.log(result, 'result');
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
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Inbox
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Sent
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => {
              toggle('3');
            }}
          >
            Compose
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId='1'>
          <Row>
            <Col sm='6'>
              <ListGroup>
                {props.loading
                  ? 'loading..'
                  : props.user.account.messages.map((m, i) => (
                      <ListGroupItem active={!!m[0][1]} key={i}>
                        <ListGroupItemHeading>
                          From: {m[0].split(' ')[0]}
                        </ListGroupItemHeading>
                        <ListGroupItemText>
                          {m[0]
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </ListGroupItemText>
                        <Button
                          onClick={() => {
                            handleReply(m[0].split(' ')[0]);
                          }}
                        >
                          Reply
                        </Button>
                      </ListGroupItem>
                    ))}
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId='2'>
          <Row>
            <Col sm='6'>
              <ListGroup>
                {props.loading
                  ? 'loading..'
                  : props.user.account.sentMessages.map((m, i) => (
                      <ListGroupItem key={i}>
                        <ListGroupItemHeading className='text-dark'>
                          To: {m[0].split(' ')[0]}
                        </ListGroupItemHeading>
                        <ListGroupItemText className='text-dark'>
                          {m[0]
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </ListGroupItemText>
                      </ListGroupItem>
                    ))}
              </ListGroup>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId='3'>
          <Row>
            <Col sm='6'>
              <Card body>
                <CardTitle>Compose</CardTitle>
                <Form>
                  <Select
                    className='text-dark'
                    value={selectedOption}
                    onChange={handleChange}
                    options={loading ? '' : users}
                  />
                  <FormGroup>
                    <Label for='messageText'>Message</Label>
                    <Input
                      maxLength={250} /* .substr(0,250) */
                      value={textArea}
                      onChange={handleTextAreaChange}
                      required={true}
                      type='textarea'
                      name='text'
                      id='messageText'
                    />
                  </FormGroup>
                  <Button onClick={handleSubmit}>Send!</Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

export default MessageCenter;
