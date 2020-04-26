import React, { Component } from "react";
import ReactDOM from "react-dom";
import '../scss/main.scss';

import Dilution from './dilution';
import RefractometerCorrection from './refractometerCorrection';
import CalculateAlc from './calculateAlc';
import BlgToSg from './blgToSg';

class App extends Component {

    constructor() {
        super();
        this.state = {
            active: 100
        }
    }

    handleClick = (e) => {
        this.setState({ active: [e.target.name] });
    }

    render() {
        const { active } = this.state;
        return <>
            <section className='header'>
                <div className='container'>
                    <div className='row'>
                        <div className='beer-header'>
                            <div className='beer-header-bg'>
                                <h1>HOME BREWER CALCULATOR</h1>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div id="accordion">
                            <div className="card">
                                {/* Korekta gęstości brzeczki */}
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0">
                                        <button name={0} className="btn btn-link" onClick={(e) => this.handleClick(e)} data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Korekta gęstości brzeczki </button>
                                        <i className={active == 0 ? 'fas fa-angle-right rotate-down icon-active' : 'fas fa-angle-right'}></i>
                                    </h5>
                                </div>
                                <div id="collapseOne" className="collapse " aria-labelledby="headingOne" data-parent="#accordion">
                                    <div className="card-body">
                                        <Dilution />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                {/* Konwerter jednostek gęstości */}
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0">
                                        <button name={1} className="btn btn-link collapsed" onClick={(e) => this.handleClick(e)} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Konwerter jednostek gęstości</button>
                                        <i className={active == 1 ? 'fas fa-angle-right rotate-down icon-active' : 'fas fa-angle-right'}></i>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div className="card-body">
                                        <BlgToSg />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                {/* Oblicz zawartość alkoholu w piwie */}
                                <div className="card-header" id="headingThree">
                                    <h5 className="mb-0">
                                        <button name={2} className="btn btn-link collapsed" onClick={(e) => this.handleClick(e)} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Oblicz zawartość alkoholu w piwie</button>
                                        <i className={active == 2 ? 'fas fa-angle-right rotate-down icon-active' : 'fas fa-angle-right'}></i>
                                    </h5>
                                </div>
                                <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div className="card-body">
                                        <CalculateAlc />
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                {/* Korekta odczytu refraktometru */}
                                <div className="card-header" id="headingFour">
                                    <h5 className="mb-0">
                                        <button name={3} className="btn btn-link collapsed" onClick={(e) => this.handleClick(e)} data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            Korekta odczytu refraktometru</button>
                                        <i className={active == 3 ? 'fas fa-angle-right rotate-down icon-active' : 'fas fa-angle-right'}></i>
                                    </h5>
                                </div>
                                <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                    <div className="card-body">
                                        <RefractometerCorrection />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }
}

ReactDOM.render(<App />, document.getElementById("app"));