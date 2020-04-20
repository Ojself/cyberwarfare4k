import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

import { Table, NavLink } from "reactstrap";
import api from "../../api";
/* todo, fix right online status. probably time difference between db and node */
/* indicate online status */
/* Look into res.send values. too much is being sent */

const Locals = (props) => {
  const [localState, setLocalState] = useState({
    cityLocals: [],
    localOnlineUsers: [],
    message: null,
    loading: true,
  });

  useEffect(() => {
    getLocals().then((result) => {
      setLocalState({
        ...localState,
        cityLocals: result.cityLocals,
        message: result.message,
        localOnlineUsers: result.localOnlineUsers,
        loading: false,
      });
    });
  }, [console.log(localState)]);

  const getLocals = async () => {
    const cityLocals = await api.getLocals();
    return cityLocals;
  };

  const checkIfOnline = (userId) => {
    if (localState.loading) {
      return false;
    }
    const result = localState.localOnlineUsers.filter((r) => r._id === userId);
    return !!result.length;
  };

  return (
    <div className="page-container ">
      <h2>
        Locals in{" "}
        {props.loading ? "your city!" : props.user.playerStats.city.name}
      </h2>
      <Table striped dark className="content">
        <thead>
          <tr>
            <th>Hacker</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {localState.loading
            ? null
            : localState.cityLocals.residents.map((user, i) => (
                <tr key={user._id}>
                  <th scope="row">
                    <NavLink href={`/hacker/${user._id}`}>
                      {checkIfOnline(user._id) && (
                        <FontAwesomeIcon icon={faWifi} />
                      )}{" "}
                      {user.name}
                    </NavLink>
                  </th>

                  <td>{user.playerStats.rankName}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Locals;
