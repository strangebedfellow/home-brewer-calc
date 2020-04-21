import React, { Component } from "react";

export default class Dilution extends Component {
    constructor() {
        super();
        this.state = {
            formula: false,
            worthVolume: 20,
            currentGravity: 16,
            targetGravity: 12
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const { worthVolume, currentGravity, targetGravity } = this.state;
        this.setState({ formula: ((worthVolume * currentGravity / targetGravity) - worthVolume).toFixed(2) });
    }

    render() {
        const { formula, worthVolume, currentGravity, targetGravity } = this.state;
        return <>
            <div className='alcohol'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Korekta gęstości brzeczki</h1>
                    <label htmlFor='worthVolume'>Ilość brzeczki (L)</label>
                    <input name='worthVolume' type='number' step="0.1" placeholder='20' onChange={this.handleInput} value={worthVolume}></input>
                    <label htmlFor='currentGravity'>Obecna gęstość (BLG)</label>
                    <input name='currentGravity' type='number' step="0.1" placeholder='16' onChange={this.handleInput} value={currentGravity}></input>
                    <label htmlFor='targetGravity'>Oczekiwana gęstość (BLG)</label>
                    <input name='targetGravity' type='number' step="0.1" placeholder='12' onChange={this.handleInput} value={targetGravity}></input>
                    <input type="submit" value="Oblicz" />
                    <p>Ilość wody, którą należy dodać do brzeczki:</p>
                    {formula && <p>{formula} L</p>}
                </form>
            </div>
        </>
    }
}