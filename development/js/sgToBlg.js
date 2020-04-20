import React, { Component } from "react";
import convertToPlato from './convertToPlato';

export default class BlgToSg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sg: 0,
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
            <div className='alcohol'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Konwerter jednostek gęstości</h1>
                    <h2>SG</h2>
                    <input name='sg' type='number' step="0.001" placeholder='1,048' onChange={this.handleInput}></input>
                    <input type="submit" value="Oblicz" />
                    {formula && <>
                        <p>BLG: {formula} </p>
                    </>}
                </form>
            </div>
        </>
    }
}