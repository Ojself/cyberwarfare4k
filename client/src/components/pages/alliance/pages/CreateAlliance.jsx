import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { Link } from "react-router-dom";

import { Button, Form, FormGroup, Row, Col, Container } from "reactstrap";
import Select from "react-select";

const dataMassager = (array) => {
  const massagedArray = array.map((document) => {
    return {
      value: document._id,
      label: document.name,
    };
  });
  return massagedArray;
};

const CreateAlliance = (props) => {
  const [alliances, setAlliances] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alianceOption, setSelectedAllianceOption] = useState(null);
  const [cityOption, setSelectedCityeOption] = useState(null);

  const handleCreate = async () => {
    const allianceId = alianceOption.value;
    const cityId = cityOption.value;
    let data;
    try {
      data = await api.createAlliance(allianceId, cityId);
      props.updateGlobalValues(data);
      props.history.push("/my-profile");
    } catch (err) {
      console.error("error", err);
      props.updateGlobalValues(err);
    }
  };

  const handleAllianceChange = (selectedOption) => {
    setSelectedAllianceOption(selectedOption);
  };
  const handleCityChange = (selectedOption) => {
    setSelectedCityeOption(selectedOption);
  };

  useEffect(() => {
    const fetchAlliances = async () => {
      let data;
      try {
        data = await api.getAlliances();
        data.alliances = data.alliances.filter((alliance) => !alliance.active);
      } catch (err) {
        console.error("error", err);
        return;
      }
      setAlliances(dataMassager(data.alliances));
      setCities(dataMassager(data.cities));
      setLoading(false);
    };
    fetchAlliances();
  }, []);

  const noAlliances = (
    <div>
      All alliances are taken. Try joining one of the{" "}
      <Link className="text-light" to="/alliance/ladder">
        <strong>existing</strong>
      </Link>{" "}
      ones
    </div>
  );

  const SelectForm = ({ loading, header, value, onChange, options }) => {
    return (
      !loading && (
        <div className="">
          <p style={{ fontSize: "0.75rem", marginBottom: "0" }}>{header}</p>
          <Form style={{ width: "100%" }} className="">
            <FormGroup>
              <Select
                className={"text-dark mb-3"}
                value={value}
                onChange={onChange}
                options={options}
              />
            </FormGroup>
          </Form>
        </div>
      )
    );
  };

  const createButton = (
    <Button
      disabled={!alianceOption || !cityOption}
      color="outline-info"
      onClick={handleCreate}
    >
      Create alliance
    </Button>
  );

  return (
    <div className="page-container">
      <h2>Create Alliance</h2>

      <div className="mt-5 d-flex justify-content-center">
        {alliances.length ? (
          <Container className="d-flex flex-column">
            <Row className="d-flex justify-content-center">
              <Col sm="12" md="6">
                <SelectForm
                  loading={loading}
                  header={"Choose a color"}
                  value={alianceOption}
                  onChange={handleAllianceChange}
                  options={alliances}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col sm="12" md="6">
                <SelectForm
                  loading={loading}
                  header={"Claim a city"}
                  value={cityOption}
                  onChange={handleCityChange}
                  options={cities}
                />
                <p>
                  Price: <span className="bitcoinColor">&#8383;</span>1000000
                </p>
                {createButton}
              </Col>
            </Row>
          </Container>
        ) : (
          noAlliances
        )}
      </div>
    </div>
  );
};
export default CreateAlliance;
