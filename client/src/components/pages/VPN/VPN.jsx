import React, { useState, useEffect } from "react";
import "./vpn.scss"
import api from "../../../api";
import { Button, Form, FormGroup } from "reactstrap";
import Select from "react-select";

const dataMassager = (cities) => {
  const massagedCities = cities.map((city) => {
    return {
      value: city._id,
      label: city.name,
      price: city.price,
    };
  });

  return massagedCities;
};

const VPN = ({ updateGlobalValues,user }) => {
  const [vpnState, setVpnState] = useState({
    cities: null,
    massagedCities: null,
    cityPrice: null,
    selectedOption: null,
    loading: true,
  });

  useEffect(() => {
    const fetchCities = async () => {
      const data = await api.getCities();
      const massagedCities = dataMassager(data.cities);
      setVpnState({
        ...vpnState,
        cities: data.cities,
        massagedCities: massagedCities,
        loading: false,
      });
    };
    fetchCities();
  }, []);
  // todo. add price in here somewhere
  const handleChange = (selectedOption) => {
    setVpnState({ ...vpnState, selectedOption });
  };

  const handleTravel = async () => {
    const cityId = vpnState.selectedOption.value;
    let data;
    try {
      data = await api.changeCity({ cityId })
    } catch(err){
      console.error("Error: ", err)
      updateGlobalValues(err);
      return
    }
    updateGlobalValues(data);
  };

  const priceOverview = vpnState.selectedOption && (
    <div>
      <h6>
        <span className="bitcoinColor">&#8383;</span>
        {vpnState.selectedOption.price}
      </h6>
      <h6>
        <span role="img" aria-label="battery">
          &#9889;
        </span>
        3
      </h6>
    </div>
  );
  return (
    <div className="page-container">
      <h1>VPN</h1>
      <br />
      <a
        href="https://nordvpn.com/"
        rel="noreferrer"
        target="_blank"
        id="nordvpn"
      >
        Sponsored by {" "}
        <img
          style={{ width: "4rem", margin: "0 0 0 1rem" }}
          src={`nordvpn/logo_vertical-white.png`}
          alt="NordVPN Logo"
        />
      </a>
      <div className="content  d-flex justify-content-center">
        <Form className="vpn-form">
          <FormGroup>
            <Select
              className={"text-dark mb-3"}
              value={vpnState.selectedOption}
              onChange={handleChange}
              options={vpnState.loading ? "" : vpnState.massagedCities}
            />
            {priceOverview}
          </FormGroup>
          <Button color="outline-info" onClick={() => handleTravel()}>
            Change location!
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VPN;
