import React, { Component } from "react";
import convertToSg from './convertToSg';

export default class CalculateAlc extends Component {
    constructor() {
        super();
        this.state = {
            og: 12,
            fg: 3,
            formula: false,
            fermentationDegree: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { og, fg } = this.state;
        this.setState({
            formula: ((76.08 * (convertToSg(og) - convertToSg(fg)) / (1.775 - convertToSg(og))) * (convertToSg(fg) / 0.794)).toFixed(2),
            fermentationDegree: (((convertToSg(og) - convertToSg(fg)) / (convertToSg(og) - 1)) * 100)
        });
    }

    render() {
        const { formula, fermentationDegree } = this.state;
        return <>
            <div className='formula-content'>
                <form onSubmit={this.handleSubmit}>
                    <h2>Gęstość początkowa (BLG)</h2>
                    <input name='og' type='number' step="0.01" placeholder='12' onChange={this.handleInput}></input>
                    <h2>Gęstość końcowa (BLG)</h2>
                    <input name='fg' type='number' step="0.01" placeholder='3' onChange={this.handleInput}></input>
                    <input type="submit" value="Oblicz" className='btn-submit' />
                    <p>Orientacyjna zawartość alkoholu (ABV - objętościowo):</p>
                    {formula && <p className='formula'>{`${formula} %`}</p>}
                    <p>Orientacyjna zawartość alkoholu (ABW - wagowo):</p>
                    {formula && <p className='formula'>{`${(formula / 1.26).toFixed(2)} %`}</p>}
                    <p>Stopień odfermentowania:</p>
                    {formula && <p className='formula'>{`${(fermentationDegree).toFixed(1)} %`}</p>}
                </form>
            </div >
        </>
    }
}