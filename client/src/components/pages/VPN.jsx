import React, { Component, useState, useEffect } from "react";
import api from "../../api";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const VPN = ({}) => {
  const [vpnState, setVpnState] = useState({
    cities: null,
    selectedCity: null,
    cityPrice: null,
    loading: true,
    message: null
  });

  useEffect(async () => {
    const apiCities = await api.getCities();
    console.log(apiCities, "cities");
    setVpnState({
      ...vpnState,
      users: apiCities.users,
      bountyUsers: apiCities.bountyUsers,
      message: apiCities.message,
      loading: false
    });
  }, []);

  const handleChange = e => {
    const selectedCity = e.target.value;
    const cityObject = vpnState.cities.filter(
      city => city.name === selectedCity
    );
    const cityPrice = cityObject[0].price;
    setVpnState({ ...vpnState, selectedCity, cityPrice });
  };

  const handleTravel = () => {
    const cityName = vpnState.selectedCity;

    api.changeCity({ cityName }).then(result => {
      console.log(result, "result change city");
    });
  };

  return (
    <div>
      <h2>VPN</h2>

      <Form>
        <FormGroup>
          <Label for="exampleSelect">Select</Label>
          <Input
            /* todo either set value to user.city OR disable user.city */
            onChange={() => handleChange}
            value={vpnState.selectedCity}
            type="select"
            name="select"
            id="exampleSelect"
          >
            {vpnState.loading ? (
              <option>none</option>
            ) : (
              vpnState.cities.map((el, i) => {
                return <option key={i}>{el.name}</option>;
              })
            )}
          </Input>
        </FormGroup>
        <Button onClick={() => handleTravel()}>Change VPN</Button>
      </Form>
    </div>
  );
};

export default VPN;
