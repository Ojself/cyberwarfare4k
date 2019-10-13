import React, { Component } from "react";

export default class CrimeTerminal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            output: [],
            showResult: false,
            crimeResult: {},
            customazation: {}
        };
    }

    render() {
        const x = <div>
            <h3>Result:</h3>
            <p>exp: {this.state.crimeResult.exp}</p>
            <p>bitcoins: {this.state.crimeResult.bitcoins}</p>
            {this.state.crimeResult.skillGained ? <p>skill gained: {this.state.crimeResult.skillGained}</p> : null}
        </div>
        return (
            <div>
                <div className='crimeTerminalWrapper'>
                    <h2>CrimeTerminal</h2>
                    {this.showResult ?
                        x :
                        'loading..'
                    }

                </div>
            </div >
        );
    }
}
