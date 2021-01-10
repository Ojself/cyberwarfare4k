import React, {useEffect, useState} from 'react'
import api from "../../../api";
import {Col, Container, Row} from "reactstrap";
import OrgCrimeCard from './OrgCrimeCard'
import OrgCrimeCardClaimed from "./OrgCrimeCardClaimed";

function orgCrimes({ user, updateGlobalValues }) {
  const [orgCrimes, setOrgCrimes] = useState([]);
  const [claimedOwnOrgCrimes, setClaimedOwnOrgCrimes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('using effect')
    const fetchOrgCrimes = async () => {
      const data = await api.getOrgCrimes();
      console.log(data,'data')
      updateGlobalValues(data);
      setOrgCrimes(data.orgCrimes)
      setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
      setLoading(false)
    };
    fetchOrgCrimes();
  }, []);
  const commitCrime = async (crimeId) => {
    console.log(crimeId);
  };
  const claimRole = async (crimeId, role)=>{
      setLoading(true)
      const data = await api.claimOrgCrimeRole(crimeId,role);
      console.log(data,'data')
      updateGlobalValues(data);
      setOrgCrimes(data.orgCrimes)
      setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
      setLoading(false)

  }
  const claimCrime = async (crimeId)=> {
      setLoading(true)
      const data = await api.claimOrgCrime(crimeId);
      console.log(data,'data')
      updateGlobalValues(data);
      setOrgCrimes(data.orgCrimes)
      setClaimedOwnOrgCrimes(data.claimedOwnOrgCrimes);
      setLoading(false)
  }

  return (
    <div style={{ minHeight: "60vh" }}>
      <h1>Organized Crime</h1>
      <div>
        <Container>
        <h5>Claimed</h5>
          <Row>
            {!loading &&
              claimedOwnOrgCrimes.map((crime, i) => {
                return (
                  <Col>
                    {" "}
                    <OrgCrimeCardClaimed
                      claimRole={claimRole}
                      crime={crime}
                    />
                  </Col>
                );
              })}
          </Row>
          <h5>Available</h5>
          <Row>
            {!loading &&
              orgCrimes.map((crime, i) => {
                return (
                  <Col>
                    {" "}
                    <OrgCrimeCard claimCrime={claimCrime} crime={crime} />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default orgCrimes
