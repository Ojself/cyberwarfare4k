import React, { Component } from 'react';
import api from '../../api';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class VPN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: null,
      selectedCity: 'Phoenix',
      loading: true,
      message: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    api.getCities().then(result => {
      console.log(result, 'result');
      this.setState({ cities: result.cities, loading: false });
    });
  }

  handleChange(event) {
    console.log(event.target.value, 'target');
    this.setState({ selectedCity: event.target.value });
  }

  handleTravel() {
    const cityName = this.state.selectedCity;

    api.changeCity({ cityName }).then(result => {
      console.log(result, 'result change city');
    });
  }

  render() {
    console.log(this.state, 'state vpn');
    return (
      <div>
        <h2>VPN</h2>
        <Form>
          <FormGroup>
            <Label for='exampleSelect'>Select</Label>
            <Input
              /* todo either set value to user.city OR disable user.city */
              onChange={this.handleChange}
              value={this.state.selectedCity}
              type='select'
              name='select'
              id='exampleSelect'
            >
              {this.state.loading ? (
                <option>none</option>
              ) : (
                this.state.cities.map((el, i) => {
                  return <option key={i}>{el.name}</option>;
                })
              )}
            </Input>
          </FormGroup>
          <Button onClick={() => this.handleTravel()}>Change VPN</Button>
        </Form>
      </div>
    );
  }
}
