import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../../../api";

const Ladder = ({}) => {
  const [ladderState, setLadderState] = useState({
    alliances: [],
    message: null,
    loading: true,
  });

  useEffect(() => {
    const fetchAlliances = async () => {
      const data = await api.getAllianceLadder();
      setLadderState({
        ...ladderState,
        alliances: data.totStats,
        message: data.message,
        loading: false,
      });
    };
    fetchAlliances();
  }, []);

  const [sortState, setSortState] = useState({
    alliance: false,
    members: false,
    rank: false,
    totWealth: false,
    cityName: false,
    totShutdowns: false,
    totBounty: false,
  });

  const toggleSort = (sortName) => {
    setSortState({
      ...sortState,
      [sortName]: !sortState[sortName],
    });
  };

  const handleSort = (e, sort) => {
    e.preventDefault();
    let sortedAlliances = ladderState.alliances || [];
    toggleSort(sort);
    if (sort === "alliance") {
      sortedAlliances = ladderState.alliances.sort((a, b) => {
        if (sortState.alliance) {
          return ("" + a.name).localeCompare(b.name);
        } else {
          return ("" + b.name).localeCompare(a.name);
        }
      });
    } else if (sort === "cityName") {
      sortedAlliances = ladderState.alliances.sort((a, b) => {
        if (sortState.alliance) {
          return ("" + a.city.name).localeCompare(b.city.name);
        } else {
          return ("" + b.city.name).localeCompare(a.city.name);
        }
      });
    } else {
      sortedAlliances = numberSortingMethod(sort);
    }
    setLadderState({
      ...ladderState,
      alliances: sortedAlliances,
    });
  };

  const numberSortingMethod = (query) => {
    return ladderState.alliances.sort((b, a) => {
      if (sortState[query]) {
        return a[query] - b[query];
      }
      return b[query] - a[query];
    });
  };

  return (
    <div className="page-container ">
      <h1>Alliance Ladder</h1>
      <Table striped dark className="content">
        <thead>
          <tr>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "alliance")}
            >
              Alliance
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "members")}
            >
              Members
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "cityName")}
            >
              City
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totRank")}
            >
              Avg. Rank
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totWealth")}
            >
              Wealth
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totShutdowns")}
            >
              Shutdowns
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => handleSort(e, "totBounty")}
            >
              Bounty
            </th>
          </tr>
        </thead>
        <tbody>
          {ladderState.alliances.map((alliance) => (
            <tr key={alliance._id}>
              <th scope="row">
                <Link className="text-light" to={`/alliance/${alliance._id}`}>
                  {alliance.name}
                </Link>
              </th>

              <td>{alliance.members}</td>

              <td>{alliance.city.name}</td>
              <td>{Math.round(alliance.totRank / alliance.members)}</td>
              <td>{alliance.totWealth}</td>
              <td>{alliance.totShutdowns}</td>
              <td>{alliance.totBounty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Ladder;
