import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Col, Container, Row } from "reactstrap";
import OrgCrimeCard from "./OrgCrimeCard";
import OrgCrimeCardClaimed from "./OrgCrimeCardClaimed";

import Tutorial from "../_molecules/Tutorial";

function orgCrimes({ user, updateGlobalValues, setUnreadNotification }) {
  const [orgCrimes, setOrgCrimes] = useState([]);
  const [claimedOwnOrgCrimes, setClaimedOwnOrgCrimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgCrimes = async () => {
      const data = await api.getOrgCrimes();
      updateGlobalValues(data);
      setOrgCrimes(data.orgCrimes);
      setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
      setLoading(false);
    };
    fetchOrgCrimes();
  }, []);
  const commitOrgCrime = async (crimeId) => {
    let data;
    try {
      data = await api.commitOrgCrime(crimeId);
      setUnreadNotification(true);
    } catch (e) {
      console.error("Error: ", e);
      return updateGlobalValues(e);
    }
    updateGlobalValues(data);
    setOrgCrimes(data.orgCrimes);
    setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
  };
  const claimRole = async (crimeId, roleName) => {
    let data;
    try {
      data = await api.claimOrgCrimeRole(crimeId, roleName);
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err);
    }
    updateGlobalValues(data, false);
    setOrgCrimes(data.orgCrimes);
    setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
  };
  const claimCrime = async (crimeId) => {
    let data;
    try {
      data = await api.claimOrgCrime(crimeId);
    } catch (err) {
      console.error("Error: ", err);
      return updateGlobalValues(err, true, true);
    }
    updateGlobalValues(data);
    setOrgCrimes(data.orgCrimes);
    setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
  };

  return (
    <div style={{ minHeight: "60vh" }}>
      <div className="d-flex flex-row justify-content-center">
        <h1>Organized Crimes</h1>
        <Tutorial size={"md"} section="Organized Crimes" />
      </div>

      <Container>
        {claimedOwnOrgCrimes.length ? <h4>Claimed</h4> : null}
        <Row>
          {!loading &&
            claimedOwnOrgCrimes.map((crime) => {
              return (
                <Col key={crime._id}>
                  {" "}
                  <OrgCrimeCardClaimed
                    user={user}
                    claimRole={claimRole}
                    commitOrgCrime={commitOrgCrime}
                    crime={crime}
                  />
                </Col>
              );
            })}
        </Row>
        {orgCrimes.length ? <h4>Available</h4> : null}
        <Row>
          {!loading &&
            orgCrimes.map((crime) => {
              return (
                <Col key={crime._id}>
                  {" "}
                  <OrgCrimeCard claimCrime={claimCrime} crime={crime} />
                </Col>
              );
            })}
        </Row>
      </Container>
    </div>
  );
}

export default orgCrimes;
