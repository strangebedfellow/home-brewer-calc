import React, { Component } from "react";
import ReactDOM from "react-dom";

import convertToPlato from './convertToPlato';

export default class RefractometerCorrection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ob: 0,
            fb: 0,
            formula: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { ob, fb } = this.state;
        this.setState({ formula: (1.0000 - 0.0044993 * ob / 1.04 + 0.011774 * fb / 1.04 + 0.00027581 * Math.pow(ob / 1.04, 2) - 0.0012717 * Math.pow(fb / 1.04, 2) - 0.0000072800 * Math.pow(ob / 1.04, 3) + 0.000063293 * Math.pow(fb / 1.04, 3)).toFixed(4) });
    }

    render() {
        const { formula } = this.state;

        return <>
                <div className='refractometer'>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Korekta odczytu refraktometru</h1>
                        <p>Gęstość początkowa (BRIX)</p>
                        <input name='ob' type='number' step="0.01" onChange={this.handleInput}></input>
                        <p>Gęstość końcowa (BRIX)</p>
                        <input name='fb' type='number' step="0.01" onChange={this.handleInput}></input>
                        <input type="submit" value="Oblicz" />
                        {formula && <p>Gęstość końcowa (po korekcie) {convertToPlato(formula)} BLG</p>}
                    </form>
                </div>
        </>
    }
}

ReactDOM.render(<RefractometerCorrection />, document.getElementById("app"));