import React, { useState, useEffect } from "react";
import api from "../../api";
/* NOTE: */
/* Too much information is being sent from the backend, no need for pw, timestamps, etc */
/* Not mobile friendly */
/* BTC symbol instead of dollar symbol */
/* Formating start date */
/* Table for items */
/* Something weird with the items. Check schematype */
/* Format the tables */
/* + Button needs to be an actuall button that does an API call */

const MyProfile = () => {
  const [profileState, setProfileState] = useState({
    user: null
  });

  useEffect(() => {
    api
      .getUser()
      .then(user => {
        console.log(user, "user");
        setProfileState({
          ...profileState,
          user
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleUpgrade = e => {
    console.log("upgrading:", e.target.name);
    /* api call here */
  };

  return (
    <div>
      <h2>My profile</h2>

      {/* Bootstrap table */}
      {/* 1st table */}
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">STATUS:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Name:</th>
            <td>{profileState.username}</td>
          </tr>
          <tr>
            <th scope="row">Alliance:</th>
            <td>{profileState.alliance}</td>
          </tr>
          <tr>
            <th scope="row">Rank:</th>
            <td>{profileState.rankName}</td>
          </tr>
          <tr>
            <th scope="row">Networth:</th>
            <td>{profileState.networth}$</td>
          </tr>
          <tr>
            <th scope="row">Start date:</th>
            <td>{profileState.createdAt}</td>
          </tr>
        </tbody>
      </table>
      {/* 2nd table */}
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">HACK STATS:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">EXP:</th>
            <td>{profileState.exp}</td>
          </tr>
          <tr>
            <th scope="row">EXP to new rank:</th>
            <td>{profileState.expToLevel}</td>
          </tr>
          <tr>
            <th scope="row">Shutdowns:</th>
            <td>{profileState.rankName}</td>
          </tr>
          <tr>
            <th scope="row">Crime Skill:</th>
            <td>{profileState.crimeSkill}</td>
          </tr>
        </tbody>
      </table>
      {/* 3rd table */}
      <table className="table table-sm table-dark">
        <thead>
          <tr>
            <th scope="col">HACK SKILLS:</th>
            <th scope="col">VALUE:</th>
            <th scope="col">UPGRADE:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Firewall:</th>
            <td>{profileState.maxFirewall}</td>
            <td>
              <button name="maxFirewall" onClick={e => handleUpgrade(e)}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">CPU:</th>
            <td>{profileState.cpu}</td>
            <td>
              <button name="cpu" onClick={e => handleUpgrade(e)}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">AntiVirus:</th>
            <td>{profileState.antiVirus}</td>
            <td>
              <button name="antiVirus" onClick={e => handleUpgrade(e)}>
                +
              </button>
            </td>
          </tr>
          <tr>
            <th scope="row">Encryption:</th>
            <td>{profileState.encryption}</td>
            <td>
              <button name="encryption" onClick={e => handleUpgrade(e)}>
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {/* 4th table Items here */}
    </div>
  );
};

export default MyProfile;
