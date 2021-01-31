import React, { useEffect, useState } from "react";
import api from "../../../api";
import FuneralCard from "./FuneralCard";
import { Container, Row, Col } from "reactstrap";

const Funeral = ({ updateGlobalValues }) => {
  const [funeralMembers, setFuneralMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getFunerals = async () => {
      let data;
      try {
        data = await api.getFunerals();
      } catch (err) {
        console.error("Error: ", err);
        updateGlobalValues(err);
      }
      setFuneralMembers(data.funerals);
      updateGlobalValues(updateGlobalValues);
      setLoading(false);
    };
    getFunerals();
  }, []);

  return (
    <div>
      <h1>Funeral</h1>
      {loading && <p>Loading..</p>}
      {funeralMembers.length ? (
        <Container>
          <Row sm="1" md="4">
            {funeralMembers.map((member) => {
              return (
                <Col className="m-auto" sm="12" md="3">
                  <FuneralCard key={member._id} member={member} />{" "}
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        <p>Noone here yet..</p>
      )}
    </div>
  );
};

export default Funeral;
