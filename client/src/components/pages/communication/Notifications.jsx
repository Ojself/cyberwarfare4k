import React, { useEffect } from "react";
import api from "../../../api";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

const Notification = ({ loading, user }) => {
  useEffect(() => {
    const readAllNotifications = async () => {
      await api.readAllCommunication("notifications");
    };
    readAllNotifications();
  }, []);

  const notificationList = loading ? (
    <p>Loading..</p>
  ) : (
    <ListGroup>
      {user.account.notifications.length ? (
        user.account.notifications.reverse().map((notification, i) => (
          <ListGroupItem
            key={`${notification.message}${i}`}
            active={!notification.read}
          >
            <ListGroupItemHeading>{notification.dateSent}</ListGroupItemHeading>
            <ListGroupItemText>{notification.message}</ListGroupItemText>
          </ListGroupItem>
        ))
      ) : (
        <p>You don't have any notifications</p>
      )}
    </ListGroup>
  );

  return (
    <div className="page-container">
      <h1>Notification</h1>
      <div className="content">{notificationList}</div>
    </div>
  );
};
export default Notification;
