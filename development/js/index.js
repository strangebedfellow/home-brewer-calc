import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
    HashRouter,
    Route,
    Switch,
    Link,
} from 'react-router-dom';

import '../scss/main.scss';

import CalculateAlc from './calculateAlc';
import RefractometerCorrection from './refractometerCorrection';
import BlgToSg from './blgToSg';
import SgToBlg from './sgToBlg';
import Dilution from './dilution';

import convertToSg from './convertToSg';

class App extends Component {
    render() {
        return <>
            <div className='site_container'>
                <CalculateAlc />
                <RefractometerCorrection />
                <BlgToSg />
                <SgToBlg />
                <Dilution />
            </div>
        </>
    }
}

ReactDOM.render(<App />, document.getElementById("app"));