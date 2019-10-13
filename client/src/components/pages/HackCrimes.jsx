import React, { Component } from 'react';
import api from '../../api';

// Styling
import { Table } from 'reactstrap';

export default class HackCrimes extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      loading: true,
      name: '',
      crimes: []
    };
  }

  handleClick(crimeId) {
    console.log(crimeId, 'crimeId')
    console.log(this.state, 'state')
    api
      .commitCrimes(crimeId)
      .then(result => {

        const crimes = this.state.crimes.filter(c => c._id !== crimeId)
        console.log(crimes, 'newcrimes')

        this.setState({ crimes: crimes });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => this.setState({ message: err.toString() }));
    console.log(this.state.crimes, 'state')
  }

  componentDidMount() {
    console.log('mounting');
    /* Get crimes */
    api
      .getCrimes()
      .then(result => {
        console.log('result', result);
        this.setState({
          message: result.message,
          loading: false,
          crimes: result.crimes
        });
        setTimeout(() => {
          /* probably not needed */
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => console.log(err));
  }

  render() {
    let crimes = this.state.crimes.filter(el => {
      return el.available;
    });

    return (
      <div>
        <h2>Hack Crimes</h2>

        <Table dark>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Difficulty</th>
              <th>Commit Crime</th>
            </tr>
          </thead>
          <tbody>
            {crimes.map((cr, i) => (
              <tr key={i}>
                <th scope='row'>{cr.name}</th>
                <td>{cr.description}</td>
                <td>{cr.crimeType}</td>
                <td>{cr.difficulty}</td>
                <td>
                  <button onClick={e => this.handleClick(cr._id)}>
                    Commit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
