import React, { Component } from "react";
import convertToPlato from './convertToPlato';

export default class SgToBlg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sg: 1.048,
            formula: false
        }
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ formula: convertToPlato(this.state.sg) });
    }

    render() {
        const { formula } = this.state;
        return <>
            <div className='formula-content'>
                <form onSubmit={this.handleSubmit}>
                    <p>SG</p>
                    <input name='sg' type='number' step="0.001" placeholder='1,048' onChange={this.handleInput}></input>
                    <input type="submit" value="Oblicz" className='btn-submit' />
                    <p>BLG:</p>
                    {formula && <p className='formula'>{formula} </p>}
                </form>
            </div>
        </>
    }
}