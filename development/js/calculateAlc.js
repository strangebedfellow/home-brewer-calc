import React, { Component } from "react";
import ReactDOM from "react-dom";

import convertToSg from './convertToSg';

export default class CalculateAlc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            og: 0,
            fg: 0,
            formula: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { og, fg } = this.state;
        this.setState({ formula: ((76.08 * (convertToSg(og) - convertToSg(fg)) / (1.775 - convertToSg(og))) * (convertToSg(fg) / 0.794)).toFixed(2) });
    }

    render() {

        const { og, fg, formula } = this.state;
        return <>
                <div className='alcohol'>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Oblicz zawartość alkoholu w piwie</h1>
                        <h2>Gęstość początkowa</h2>
                        <input name='og' type='number' step="0.01" onChange={this.handleInput}></input>
                        <h2>Gęstość końcowa</h2>
                        <input name='fg' type='number' step="0.01" onChange={this.handleInput}></input>
                        <input type="submit" value="Oblicz" />
                        {formula && <>
                            <p>Orientacyjna zawartość alkoholu (ABV - objętościowo): {`${formula} %`} </p>
                            <p>Orientacyjna zawartość alkoholu (ABW - wagowo): {`${(formula / 1.26).toFixed(2)} %`} </p>
                            <p>Stopień odfermentowania: {(((convertToSg(og) - convertToSg(fg)) / (convertToSg(og) - 1)) * 100).toFixed(1)} %</p>
                        </>}
                    </form>
                </div>
        </>
    }
}