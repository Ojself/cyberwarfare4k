import React, { useState, useEffect } from "react";
import api from "../../../../api";
import { Link } from "react-router-dom";

import { Button, Form, FormGroup } from "reactstrap";
import Select from "react-select";

const dataMassager = (alliances) => {
  alliances.forEach((a) => console.log(a.members));
  const massagedAlliances = alliances
    .filter((alliance) => !alliance.active)
    .map((alliance) => {
      return {
        value: alliance._id,
        label: alliance.name,
      };
    });
  return massagedAlliances;
};

const CreateAlliance = (props) => {
  const [alliances, setAlliances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleCreate = async () => {
    const allianceId = selectedOption.value;
    console.log(allianceId, "allianceId");
    let data;
    try {
      await api.createAlliance(allianceId);
      props.history.push(`/my-profile`);
    } catch (err) {
      console.log(err, "err");
    }
    console.log(data, "data");
  };

  useEffect(() => {
    const fetchAlliances = async () => {
      setLoading(true);
      let data;
      try {
        data = await api.getAlliances();
        data.alliances = data.alliances.filter(
          (alliance) => alliance.member.length === 0
        );
      } catch (e) {
        console.log(e);
      }
      setAlliances(dataMassager(data.alliances));
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

  const allianceSelect = !loading && (
    <div className="w-25">
      <p>
        Price: <span style={{ color: "#F08F18" }}>&#8383;</span>1000000
      </p>
      <Form style={{ width: "100%" }} className="">
        <FormGroup>
          <Select
            className={"text-dark mb-3"}
            value={selectedOption}
            onChange={handleChange}
            options={alliances}
          />
        </FormGroup>
        <Button
          disabled={!selectedOption}
          color="outline-info"
          onClick={handleCreate}
        >
          Create alliance
        </Button>
      </Form>
    </div>
  );

  return (
    <div className="page-container">
      <h2>Create Alliance</h2>

      <div className="mt-5 d-flex justify-content-center">
        {alliances.length ? allianceSelect : noAlliances}
      </div>
    </div>
  );
};
export default CreateAlliance;
