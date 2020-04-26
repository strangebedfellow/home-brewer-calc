import React, { Component } from "react";
import convertToSg from './convertToSg';

export default class BlgToSg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blg: 12,
            formula: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ formula: convertToSg(this.state.blg) });
    }

    render() {

        const { formula } = this.state;
        return <>
            <div className='alcohol'>
                <form onSubmit={this.handleSubmit}>
                    <p>BLG</p>
                    <input name='blg' type='number' step="0.1" placeholder='12' onChange={this.handleInput}></input>
                    <input type="submit" value="Oblicz" className='btn-submit' />
                    <p>SG (Specific Gravity):</p>
                    {formula && <p className='formula'>{formula} </p>}
                </form>
            </div>
        </>
    }
}