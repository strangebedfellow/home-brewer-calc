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
    // increment = () => {
    //     this.setState({ worthVolume: parseFloat(this.state.worthVolume) + 0.5 });
    // }
    // decrement = () => {
    //     this.setState({ worthVolume: parseFloat(this.state.worthVolume) - 0.5 });
    // }

    handleSubmit = e => {
        e.preventDefault();
        const { worthVolume, currentGravity, targetGravity } = this.state;
        // const isworthValid = currentGravity == targetGravity;
        // isworthValid ? alert("Obecna gęstość musi być wyższa od oczekiwanej gęstości!") : 
        this.setState({ formula: ((worthVolume * currentGravity / targetGravity) - worthVolume).toFixed(2) });;

    }

    render() {
        const { formula, worthVolume, currentGravity, targetGravity } = this.state;
        return <>
            <div className='formula-content'>
                <div class="alert alert-warning" role="alert">
                    <span>Gęstość brzeczki po zakończonym warzeniu jest zbyt wysoka?</span>
                    <span>Żaden problem! Oblicz ilość wody jaką należy dolać do brzeczki, aby uzyskać zaplanowaną gęstość początkową.</span>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='worthVolume'>Ilość brzeczki (L)</label>
                    {/* <button onClick={this.increment}>+</button> */}
                    <input name='worthVolume' type='number' step="0.1" placeholder='20' onChange={this.handleInput} className={formula ? 'light-up': ''}></input>
                    {/* <button onClick={this.decrement}>-</button> */}
                    <label htmlFor='currentGravity'>Obecna gęstość (BLG)</label>
                    <input name='currentGravity' type='number' step="0.1" placeholder='16' onChange={this.handleInput} className={formula ? 'light-up': ''}></input>
                    <label htmlFor='targetGravity'>Oczekiwana gęstość (BLG)</label>
                    <input name='targetGravity' type='number' step="0.1" placeholder='12' onChange={this.handleInput} className={formula ? 'light-up': ''}></input>
                    <input type="submit" value="Oblicz" className='btn-submit' />
                   

                </form>
                <p className='formula-title'>Ilość wody, którą należy dodać do brzeczki:</p>
                    {/* {formula && <p className='formula'>{formula} L</p>}  */}
                    <p className={formula ? 'formula visible' : 'no-formula hidden'}>{formula ? `${formula} L`: '6.67 L'}</p>
            </div>
        </>
    }
}