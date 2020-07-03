import React, {Component} from 'react';

import Cast from "./Cast";

import './game.css'
import {Tab, Tabs} from "react-bootstrap";

class Game extends Component {
    render() {
        return (
            <div className="m-3 m-xl-5">

                <div className="row">
                    <div className="col">
                        <Tabs defaultActiveKey="feed" id="uncontrolled-tab-example">
                            <Tab eventKey="base" title="Base">
                                <Cast/>
                            </Tab>
                            <Tab eventKey="plate" title="Plate">
                            </Tab>
                            <Tab eventKey="water_boy" title="Water boy">
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;