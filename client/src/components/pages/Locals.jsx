import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import api from "../../api";
/* todo, fix right online status. probably time difference between db and node */
/* indicate online status */
/* Look into res.send values. too much is being sent */

const Locals = ({ globalLoading, user }) => {
  const [localState, setLocalState] = useState({
    cityLocals: [],
    localOnlineUsers: [],
    message: null,
    loading: true,
  });

  useEffect(() => {
    const fetchLocals = async () => {
      const data = await api.getLocals();
      setLocalState({
        ...localState,
        cityLocals: data.cityLocals,
        message: data.message,
        localOnlineUsers: data.localOnlineUsers,
        loading: false,
      });
    };
    fetchLocals();
  }, []);

  const checkIfOnline = (userId) => {
    if (localState.loading) {
      return false;
    }
    const result = localState.localOnlineUsers.filter((r) => r._id === userId);
    return !!result.length;
  };

  return (
    <div className="page-container ">
      <h1 className="">
        Locals in {globalLoading ? "your city!" : user.playerStats.city.name}
      </h1>
      <Table striped dark className="content">
        <thead>
          <tr>
            <th>Hacker</th>
            <th>Alliance</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {localState.loading
            ? null
            : localState.cityLocals.residents.map((user, i) => (
                <tr key={user._id}>
                  <th scope="row">
                    <Link className="text-light" to={`/hacker/${user._id}`}>
                      {checkIfOnline(user._id) && (
                        <FontAwesomeIcon
                          className="text-warning"
                          icon={faWifi}
                        />
                      )}{" "}
                      {user.name}
                    </Link>
                  </th>
                  <td>{user.alliance ? user.alliance.name : "-"}</td>
                  <td>{user.playerStats.rankName}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Locals;
