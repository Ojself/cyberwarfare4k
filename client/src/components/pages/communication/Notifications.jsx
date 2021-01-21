import React, { useEffect, useState } from "react";
import classnames from "classnames";
import api from "../../../api";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

import "./notifications.scss";

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [generalNotifications, setGeneralNotifications] = useState([]);
  const [crimeNotifications, setCrimeNotifications] = useState([]);
  const [spyNotifications, setSpyNotifications] = useState([]);
  const [logsNotifications, setLogsNotifications] = useState([]);

  const [activeTab, setActiveTab] = useState("General");

  useEffect(() => {
    const getNotifications = async () => {
      let data = await api.getNotifications();
      setGeneralNotifications(
        data.notifications.filter((n) => n.genre === "General")
      );
      setCrimeNotifications(
        data.notifications.filter((n) => n.genre === "Organized Crime")
      );
      setSpyNotifications(
        data.notifications.filter((n) => n.genre === "Spy Report")
      );
      setLogsNotifications(
        data.notifications.filter((n) => n.genre === "Logs")
      );
      setLoading(false);
    };
    getNotifications();
  }, []);

  const allTabs = ["General", "Organized Crime", "Spy Report", "Logs"];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const NotificationList = ({ loading, notifications }) => {
    return loading ? (
      <p>Loading..</p>
    ) : (
      <ListGroup>
        {notifications.length ? (
          notifications.map((notification, i) => (
            <ListGroupItem
              className="mt-2 text-white"
              key={notification._id}
              active={!notification.read}
            >
              <ListGroupItemHeading>
                {notification.dateSent}
              </ListGroupItemHeading>
              {notification.text.map((text, i) => (
                <ListGroupItemText key={`${text}${i}`}>
                  {text}
                </ListGroupItemText>
              ))}
            </ListGroupItem>
          ))
        ) : (
          <p>Empty</p>
        )}
      </ListGroup>
    );
  };

  const tabsHelper = {
    General: generalNotifications,
    "Organized Crime": crimeNotifications,
    "Spy Report": spyNotifications,
    Logs: logsNotifications,
  };

  const unreadTab = (tab) => {
    if (tabsHelper[tab].some((notification) => notification.read === false)) {
      return "text-danger";
    }
    return "";
  };

  return (
    <div className="page-container">
      <h1>Notification</h1>
      <div>
        <Nav className="d-flex justify-content-center w-100 m-0" tabs>
          {allTabs.map((tab) => {
            return (
              <NavItem key={tab}>
                <NavLink
                  className={
                    (classnames({ active: activeTab === tab }), unreadTab(tab))
                  }
                  onClick={() => toggle(tab)}
                >
                  {tab}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId={"General"}>
            <Row className="d-flex justify-content-center w-100 m-0">
              <Col sm="12" md="8">
                <NotificationList
                  loading={loading}
                  notifications={generalNotifications}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId={"Organized Crime"}>
            <Row className="d-flex justify-content-center w-100 m-0">
              <Col sm="12" md="8">
                {" "}
                <NotificationList
                  loading={loading}
                  notifications={crimeNotifications}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId={"Spy Report"}>
            <Row className="d-flex justify-content-center w-100 m-0">
              <Col sm="12" md="8">
                {" "}
                <NotificationList
                  loading={loading}
                  notifications={spyNotifications}
                />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId={"Logs"}>
            <Row className="d-flex justify-content-center w-100 my-1 mx-0">
              <Col sm="12" md="8">
                {" "}
                <NotificationList
                  loading={loading}
                  notifications={logsNotifications}
                />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};
export default Notification;
