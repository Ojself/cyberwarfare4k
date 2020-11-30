import React, { useState, useEffect } from "react";
import api from "../../api";
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

const VPN = ({ updateGlobalValues }) => {
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
    console.log(vpnState, "vpnState", selectedOption, "selected");
  };

  const handleTravel = async () => {
    const cityId = vpnState.selectedOption.value;
    let data;
    try {
      data = await api.changeCity({ cityId })
    } catch(err){
      updateGlobalValues(err);
      return
    }
    updateGlobalValues(data);
  };

  const priceOverview = vpnState.selectedOption && (
    <div>
      <h6>
        <span style={{ color: "#F08F18" }}>&#8383;</span>
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
      <h1 className="display-4">VPN</h1>

      <Form style={{ width: "25%" }} className="content">
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
          Change VPN
        </Button>
      </Form>
    </div>
  );
};

export default VPN;
