import React, { useState, useEffect } from "react";
import api from "../../api";

import Tutorial from "./_molecules/Tutorial";

import { Table, Button, UncontrolledTooltip, Progress } from "reactstrap";

const stashColors = ["blue", "green", "orange", "red"];
const getStashColor = (row, col) =>
  stashColors[(row + col) % stashColors.length];

const getHealthBar = (dc) => {
  const percentage = (dc.currentFirewall / dc.maxFirewall) * 100;
  let color;
  switch (true) {
    case percentage > 79:
      color = "success";
      break;
    case percentage > 39:
      color = "warning";
      break;
    case percentage > 24:
      color = "danger";
      break;
    default:
      color = "danger";
  }
  return (
    <Progress
      className="mt-2"
      color={color}
      max={dc.maxFirewall}
      value={dc.currentFirewall}
    />
  );
};

const DataCenter = ({ globalLoading, user, updateGlobalValues }) => {
  const [dataCenterState, setDataCenterState] = useState({
    dataCenters: [],
    loading: true,
  });

  useEffect(() => {
    const fetchDataCenters = async () => {
      const data = await api.getDataCenters();
      setDataCenterState({
        ...dataCenterState,
        dataCenters: data.dataCenters,
        loading: false,
      });
    };
    fetchDataCenters();
  }, []);

  const handleDataCenterPurchase = async (e) => {
    const dataCenterId = e.target.value;
    let data;
    try {
      data = await api.purchaseDataCenter(dataCenterId);
    } catch (err) {
      return updateGlobalValues(err);
    }
    updateGlobalValues(data);
    setDataCenterState({
      ...dataCenterState,
      dataCenters: data.dataCenters,
    });
  };

  const handleDataCenterAttack = async (e) => {
    const dataCenterId = e.target.value;
    let result;
    try {
      result = await api.attackDataCenter(dataCenterId);
    } catch (err) {
      return updateGlobalValues(err);
    }
    setDataCenterState({
      ...dataCenterState,
      dataCenters: result.dataCenters,
    });
    updateGlobalValues(result);
  };
  const getDataCenterActionButton = (dc) => {
    if (globalLoading) return;

    let innerText = "Buy";
    let onClick = () => {};
    let disabled = false;
    let buttonColor = "primary";

    if (dc.status === "Owned" && dc.owner.name === user.name) {
      disabled = true;
      innerText = "Yours";
      buttonColor = "success";
    } else if (dc.status === "Under Attack") {
      disabled = true;
      buttonColor = "outline-danger";
      innerText = "Attack";
    } else if (dc.status === "Resetting") {
      disabled = true;
    } else if (dc.status === "Owned") {
      buttonColor = "outline-danger";
      innerText = "Attack";
      onClick = (e) => handleDataCenterAttack(e);
    } else {
      innerText = "Buy";
      onClick = (e) => handleDataCenterPurchase(e);
    }

    return (
      <Button
        color={buttonColor}
        disabled={disabled}
        name={dc.name}
        onClick={onClick}
        value={dc._id}
      >
        {innerText}
      </Button>
    );
  };

  const dataCenterTable = !dataCenterState.loading && (
    <Table className="content" dark>
      <thead>
        <tr>
          {[
            "Name",
            "Price",
            "Status",
            "Required Stash",
            "Action",
            "Health",
          ].map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataCenterState.dataCenters.map((dc, i) => (
          <tr key={dc._id}>
            <th scope="row">{dc.name}</th>
            <td id={`revenueTip${i}`}> {dc.price}</td>
            <td id={`ownerTip${i}`}>{dc.status}</td>
            <td className="d">
              {dc.status === "Owned" && (
                <>
                  {dc.requiredStash.map((stash, j) => (
                    <img
                      title={stash.name}
                      key={`${stash._id}${j}`}
                      style={{ width: "2.25rem", marginLeft: "2px" }}
                      src={`../../stashPics/${stash.name}/${getStashColor(
                        i,
                        j
                      )}.png`}
                      alt={stash.name}
                    ></img>
                  ))}
                </>
              )}
            </td>

            <td>{getDataCenterActionButton(dc)}</td>

            <td>{getHealthBar(dc)}</td>

            <UncontrolledTooltip placement="top" target={`revenueTip${i}`}>
              <span className="bitcoinColor" style={{ fontSize: "1rem" }}>
                &#8383;
              </span>
              {dc.minutlyrevenue} per minute
            </UncontrolledTooltip>
            {dc.status === "Owned" && (
              <UncontrolledTooltip placement="top" target={`ownerTip${i}`}>
                {dc.owner.name}
              </UncontrolledTooltip>
            )}
            {dc.status === "Under Attack" && (
              <UncontrolledTooltip placement="top" target={`ownerTip${i}`}>
                {`Attacked by ${dc.attacker.name}`}
              </UncontrolledTooltip>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <div className="page-container">
      <div className="d-flex justify-content-center">
        <h1>Data centers</h1>
        <Tutorial section={"Data Centers"} />
      </div>
      {<h6>{user ? user.playerStats.city.name : "City"}</h6>}
      {dataCenterState.loading ? <p>loading..</p> : dataCenterTable}
    </div>
  );
};

export default DataCenter;
