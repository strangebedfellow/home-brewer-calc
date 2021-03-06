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
            <div className='formula-content'>
                <div class="alert alert-warning" role="alert">
                    <span>Refraktometr to wygodny przyrząd do pomiaru gęstości brzeczki.</span>
                    <span>Bada on współczynnik załamania światła, jednak w przypadku (częściowo) przefermentowanej brzeczki alkohol zaburza prawidłowy odczyt, co wymaga korekcji.</span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <p>Gęstość początkowa (BRIX)</p>
                    <input name='ob' type='number' step="0.01" placeholder='12' onChange={this.handleInput} className={formula ? 'light-up' : ''}></input>
                    <p>Gęstość końcowa (BRIX)</p>
                    <input name='fb' type='number' step="0.01" placeholder='6' onChange={this.handleInput} className={formula ? 'light-up' : ''}></input>
                    <input type="submit" value="Oblicz" className='btn-submit' />
                </form>
                <p className='formula-title'>Gęstość końcowa (po korekcie):</p>
                {/* {formula && <p className='formula'> {convertToPlato(formula)} BLG</p>} */}
                <p className={formula ? 'formula visible' : 'no-formula hidden'}>{formula ? <span>{convertToPlato(formula)} BLG</span> : <span>2.92 BLG</span>}</p>
            </div>
        </>
    }
}

