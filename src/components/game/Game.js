import React, {Component} from 'react';

import Cast from "./Cast";

import './game.css'
import {Tab, Tabs} from "react-bootstrap";
import GameBanner from "./GameBanner";

class Game extends Component {
    render() {
        return (
            <div className="m-3 m-xl-5">
                <GameBanner
                    title="Agile vs. Stanford"
                    date="March 04"
                    start_time="5PM"
                    end_time="7PM"
                    division="Majors"
                    location="Greer Park"
                    comments={null}
                />
                <div className="row">
                    <div className="col">
                        <Tabs defaultActiveKey="base" id="uncontrolled-tab-example">
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