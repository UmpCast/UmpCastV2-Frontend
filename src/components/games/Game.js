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
                        <div className="jumbotron pb-2 pt-3 pt-lg-4">
                            <div className="d-flex justify-content-between">
                                <h1 className="pt-2"><strong>Agile vs. Stanford</strong></h1>
                                <div>
                                    <h2 className="flex-shrink-0">
                                        <span className="badge btn rounded text-white btn-primary">Greer Park</span>
                                    </h2>
                                </div>
                            </div>
                            <h2 className="text-primary"><strong>March 04</strong> <span
                                className="text-secondary">·</span> 5PM - 7PM</h2>
                            <hr className="mt-2 mb-2 mb-lg-3 mt-lg-3"/>
                            <h5 className="text-muted">
                                <span className="mr-3"><strong>Division:</strong> Majors </span>
                                <span className="mr-3"><strong>Comments:</strong> None </span>
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Tabs defaultActiveKey="feed" id="uncontrolled-tab-example">
                            <Tab eventKey="feed" title="Base">
                                <Cast/>
                            </Tab>
                            <Tab eventKey="history" title="Plate">
                            </Tab>
                            <Tab eventKey="visibility" title="Water boy">
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;