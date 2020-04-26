import React, { Component } from "react";
import convertToPlato from './convertToPlato';

export default class RefractometerCorrection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ob: 12,
            fb: 6,
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
            <div className='alcohol'>
                <form onSubmit={this.handleSubmit}>
                    <p>Gęstość początkowa (BRIX)</p>
                    <input name='ob' type='number' step="0.01" placeholder='12' onChange={this.handleInput}></input>
                    <p>Gęstość końcowa (BRIX)</p>
                    <input name='fb' type='number' step="0.01" placeholder='6' onChange={this.handleInput}></input>
                    <input type="submit" value="Oblicz" className='btn-submit' />
                    <p>Gęstość końcowa (po korekcie):</p>
                    {formula && <p className='formula'> {convertToPlato(formula)} BLG</p>}
                </form>
            </div>
        </>
    }
}

