import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import api from "../../api";

import Tutorial from "./_molecules/Tutorial";

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
    <div className="page-container">
      <div className="d-flex justify-content-center">
        <h1>
          Locals in {globalLoading ? "your city!" : user.playerStats.city.name}
        </h1>
        <Tutorial section={"Local Hackers"} />
      </div>
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
                  <td>
                    {user.alliance ? (
                      <>
                        <Link
                          className="text-light"
                          to={`/alliance/${user.alliance._id}`}
                        >
                          {user.alliance.name}
                        </Link>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{user.playerStats.rankName}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Locals;
