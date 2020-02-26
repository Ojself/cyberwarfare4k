import React, { useState, useEffect } from "react";
import { Table, NavLink, Button } from "reactstrap";
import api from "../../../../api";
/* todo don't show alliances that dont have members */
const Ladder = props => {
  const [ladderState, setLadderState] = useState({
    alliances: [],
    message: null,
    loading: true
  });

  useEffect(() => {
    getAlliances().then(result => {
      setLadderState({
        ...ladderState,
        alliances: result.stats,
        message: result.message,
        loading: false
      });
    });
  }, []);

  const getAlliances = async () => {
    const alliances = await api.getAllAlliances();
    console.log(alliances, "result");
    return alliances;
  };

  const handleSort = (e, sort) => {
    e.preventDefault();
    let sortedAlliances = ladderState.alliances || [];
    // TODO change some value names so we can dynamicaly run functions (see switch)
    switch (sort) {
      case "alliance":
        sortedAlliances = ladderState.alliances.sort((a, b) =>
          ("" + a.name).localeCompare(b.name)
        );
        break;
      case "members":
        console.log("sw");
        sortedAlliances = sortingMethod("members");
        break;
      case "rank":
        sortedAlliances = sortingMethod("rank");
        break;
      case "wealth":
        sortedAlliances = sortingMethod("totWealth");
        break;
      case "hackskills":
        sortedAlliances = sortingMethod("totHackSkill");
        break;
      case "crimeskills":
        sortedAlliances = sortingMethod("totCrimeSkill");
        break;
      case "aggressive":
        sortedAlliances = sortingMethod("totAttacksInitiated");
        break;
      case "shutdowns":
        sortedAlliances = sortingMethod("totShutdowns");
        break;
      case "vpnchanges":
        sortedAlliances = sortingMethod("totVpnChanges");
        break;
      case "cc":
        sortedAlliances = sortingMethod("totCurrencies");
        break;
      case "ccpurch":
        sortedAlliances = sortingMethod("totCurrencyPurchases");
        break;
      case "bounty":
        sortedAlliances = sortingMethod("totBounty");
        break;
    }

    setLadderState({
      ...ladderState,
      alliances: sortedAlliances
    });
  };

  const sortingMethod = query => {
    const sortedAllianced = ladderState.alliances.sort(
      (b, a) => a[query] - b[query]
    );
    return sortedAllianced;
  };

  return (
    <div>
      <h2>Alliance Ladder</h2>
      <Table striped dark>
        <thead>
          <tr>
            <th onClick={e => handleSort(e, "alliance")}>Alliance</th>
            <th onClick={e => handleSort(e, "members")}>Members</th>
            <th onClick={e => handleSort(e, "rank")}>Highest ranked</th>
            <th onClick={e => handleSort(e, "wealth")}>Wealth</th>
            <th onClick={e => handleSort(e, "hackskills")}>Hacker skills</th>
            <th onClick={e => handleSort(e, "crimeskills")}>Crime skills</th>
            <th onClick={e => handleSort(e, "aggressive")}>Most aggressive</th>
            <th onClick={e => handleSort(e, "shutdowns")}>Most shutdowns</th>
            <th onClick={e => handleSort(e, "vpnchanges")}>Most on the move</th>
            <th onClick={e => handleSort(e, "cc")}>Most CC holders</th>
            <th onClick={e => handleSort(e, "ccpurch")}>Most CC purchases</th>
            <th onClick={e => handleSort(e, "bounty")}>Most Bounty</th>
          </tr>
        </thead>
        <tbody>
          {ladderState.alliances.map((alliance, i) => (
            <tr key={alliance._id}>
              <th scope="row">
                <NavLink href={`/alliance/${alliance._id}`}>
                  {alliance.name}
                </NavLink>
              </th>

              <td>{alliance.members}</td>
              <td>{Math.round(alliance.rank / alliance.members) || 0}</td>
              <td>{Math.round(alliance.totWealth / alliance.members) || 0}</td>
              <td>
                {Math.round(alliance.totHackSkill / alliance.members) || 0}
              </td>
              <td>
                {Math.round(alliance.totCrimeSkill / alliance.members) || 0}
              </td>
              <td>
                {Math.round(alliance.totAttacksInitiated / alliance.members) ||
                  0}
              </td>
              <td>
                {Math.round(alliance.totShutdowns / alliance.members) || 0}
              </td>
              <td>
                {Math.round(alliance.totVpnChanges / alliance.members) || 0}
              </td>
              <td>
                {Math.round(alliance.totCurrencies / alliance.members) || 0}
              </td>
              <td>
                {Math.round(alliance.totCurrencyPurchases / alliance.members) ||
                  0}
              </td>
              <td>{Math.round(alliance.totBounty / alliance.members) || 0}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Ladder;
