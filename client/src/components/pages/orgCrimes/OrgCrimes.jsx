import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Col, Container, Row } from "reactstrap";
import OrgCrimeCard from "./OrgCrimeCard";
import OrgCrimeCardClaimed from "./OrgCrimeCardClaimed";

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
    } catch (e) {
      console.error("Error: ", e);
      return updateGlobalValues(e);
    }
    updateGlobalValues(data, false);
    setOrgCrimes(data.orgCrimes);
    setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
  };
  const claimCrime = async (crimeId) => {
    let data;
    try {
      data = await api.claimOrgCrime(crimeId);
    } catch (e) {
      console.error("Error: ", e);
      return updateGlobalValues(e);
    }
    console.log(data, "data");
    updateGlobalValues(data);
    setOrgCrimes(data.orgCrimes);
    setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
  };

  return (
    <div style={{ minHeight: "60vh" }}>
      <h1>Organized Crime</h1>

      <Container>
        <h4>Claimed</h4>
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
        <h4>Available</h4>
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
