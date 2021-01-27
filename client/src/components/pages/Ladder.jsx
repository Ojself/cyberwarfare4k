import React, { useState, useEffect } from "react";
import { Container, Col, Row, Table } from "reactstrap";
import api from "../../api";
import { Link } from "react-router-dom";

const displayNoneAttributes = ["Rank", "Shutdowns", "Crimes"];

const Ladder = () => {
  const [ladderState, setLadderState] = useState({
    users: [],
    message: null,
    loading: true,
  });
  const [sortState, setSortState] = useState({
    hacker: false,
    alliance: false,
    rank: false,
    shutdowns: false,
    crimesInitiated: false,
    networth: false,
  });

  const toggleSort = (sortName) => {
    setSortState({
      ...sortState,
      [sortName]: !sortState[sortName],
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await api.getAllLadderUsers();
      setLadderState({
        ...ladderState,
        users: users.users,
        message: users.message,
        loading: false,
      });
    };
    fetchUsers();
  }, []);

  const handleSort = (sort) => {
    sort = sort.toLowerCase();
    let sortedUsers = ladderState.users || [];

    switch (sort) {
      case "hacker":
        toggleSort("hacker");
        sortedUsers = ladderState.users.sort((a, b) => {
          if (sortState.hacker) {
            return ("" + a.name).localeCompare(b.name);
          }
          return ("" + b.name).localeCompare(a.name);
        });
        break;
      case "alliance":
        toggleSort("alliance"); // yikes
        sortedUsers = ladderState.users.sort((a, b) => {
          if (!a.alliance || !a.alliance.name) {
            a = { alliance: { name: "" } };
          }
          if (!b.alliance || !b.alliance.name) {
            b = { alliance: { name: "" } };
          }
          if (sortState.alliance) {
            return ("" + a.alliance.name).localeCompare(b.alliance.name);
          }
          return ("" + b.alliance.name).localeCompare(a.alliance.name);
        });
        break;
      case "rank":
        toggleSort("rank");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.rank) {
            return a.playerStats.rank - b.playerStats.rank;
          }
          return b.playerStats.rank - a.playerStats.rank;
        });
        break;
      case "shutdowns":
        toggleSort("shutdowns");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.shutdowns) {
            return a.fightInformation.shutdowns - b.fightInformation.shutdowns;
          }
          return b.fightInformation.shutdowns - a.fightInformation.shutdowns;
        });
        break;
      case "crimes":
        toggleSort("crimes");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.crimes) {
            return (
              a.fightInformation.crimesInitiated -
              b.fightInformation.crimesInitiated
            );
          }
          return (
            b.fightInformation.crimesInitiated -
            a.fightInformation.crimesInitiated
          );
        });
        break;
      case "networth":
        toggleSort("networth");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.networth) {
            return a.playerStats.bitCoins - b.playerStats.bitCoins;
          }
          return b.playerStats.bitCoins - a.playerStats.bitCoins;
        });
        break;
      default:
        toggleSort("networth");
        sortedUsers = ladderState.users.sort((b, a) => {
          if (sortState.networth) {
            return a.playerStats.bitCoins - b.playerStats.bitCoins;
          }
          return b.playerStats.bitCoins - a.playerStats.bitCoins;
        });
        break;
    }

    setLadderState({
      ...ladderState,
      users: sortedUsers,
    });
  };

  const responsiveCheck = (attr) => {
    if (displayNoneAttributes.includes(attr)) {
      return "display-none-when-mobile";
    }
    return "";
  };

  return (
    <div className="page-container">
      <h1>Ladder</h1>
      <Container className="">
        <Row>
          <Col md="12">
            <Table responsive striped dark>
              <thead>
                <tr>
                  {[
                    "Hacker",
                    "Alliance",
                    "Rank",
                    "Shutdowns",
                    "Crimes",
                    "Networth",
                  ].map((s, i) => {
                    return (
                      <th
                        key={i}
                        className={responsiveCheck(s)}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleSort(s)}
                      >
                        {s}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ladderState.users.map((user) => (
                  <tr key={user._id}>
                    <th scope="row">
                      <Link className="text-light" to={`/hacker/${user._id}`}>
                        {user.name}
                      </Link>
                    </th>
                    <td>
                      {user.alliance ? (
                        <Link
                          className="text-light"
                          to={`/alliance/${user.alliance._id}`}
                        >
                          {user.alliance.name}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="display-none-when-mobile">
                      {user.playerStats.rankName}
                    </td>
                    <td className="display-none-when-mobile">
                      {user.fightInformation.shutdowns}
                    </td>
                    <td className="display-none-when-mobile">
                      {user.fightInformation.crimesInitiated}
                    </td>
                    <td>
                      {Math.round(user.playerStats.bitCoins)}
                      <span className="bitcoinColor">&#8383;</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ladder;
