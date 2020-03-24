import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    HashRouter,
    Route,
    Switch,
    Link,
} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            og: 0,
            fg: 0,
            wynik: false
        }
    }

    handleInput = (e) => {

        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const ogToSg = (1 + (parseFloat(this.state.og) / (258.6 - ((parseFloat(this.state.og) / 258.2) * 227.1)))).toFixed(3);
        const fgToSg = (1 + (parseFloat(this.state.fg) / (258.6 - ((parseFloat(this.state.fg) / 258.2) * 227.1)))).toFixed(3);
        const formula = ((76.08 * (ogToSg - fgToSg) / (1.775 - ogToSg)) * (fgToSg / 0.794)).toFixed(2);
        this.setState({ wynik: formula });
    }

    render() {

        const { wynik } = this.state;
        return <>
            <div className='site_container'>
                <div className='alcohol'>
                    <form onSubmit={this.handleSubmit}>
                        <h1>Oblicz zawartość alkoholu w piwie</h1>
                        <p>Gęstość początkowa</p>
                        <input name='og' type='number' step="0.1" onChange={this.handleInput}></input>
                        <p>Gęstość końcowa</p>
                        <input name='fg' type='number' step="0.1" onChange={this.handleInput}></input>
                        <input type="submit" value="Oblicz" />
                        {wynik && <p>Orientacyjna zawartość alkoholu (ABV - objętościowo): {`${wynik} %`} </p>}
                        {wynik && <p>Orientacyjna zawartość alkoholu (ABW - wagowo): {`${(wynik / 1.26).toFixed(2)} %`} </p>}
                    </form>
                </div>
            </div>
        </>
    }
}

ReactDOM.render(<App />, document.getElementById("app"));