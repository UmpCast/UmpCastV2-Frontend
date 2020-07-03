import React, {Component} from 'react';

import {Card, Button, Accordion} from "react-bootstrap"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBaseballBall,
    faUserAlt,
    faExclamationCircle,
    faWrench,
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import './dashboard.css'
import ReactTooltip from "react-tooltip";
import FullGame from "../games/FullGame";
import Message from "./Message";

class Feed extends Component {
    render() {
        return (
            <div className="align-items-center mt-3">
                <div className="row mx-auto pb-4">
                    <div className="col-12">
                        <Accordion>
                            <Card text="white" bg="dark">
                                <Card.Header>
                                    <strong className="text-white">You have a game coming up</strong>
                                    <Accordion.Toggle as={Button} eventKey="0"
                                                      className="flex-wrap float-right secondary rounded border-muted p-0 bg-dark border-0">
                                        <FontAwesomeIcon icon={faChevronDown}/>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body className="pb-0">
                                        <FullGame />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div className="mb-4">
                    <Message/>
                </div>
                <div className="row mx-auto mb-3">
                    <div className="col-1 px-0 text-center">
                        <div className="d-inline-flex flex-wrap bg-success rounded p-2">
                            <FontAwesomeIcon icon={faUserAlt} className="text-white fa-2x"/>
                        </div>
                    </div>
                    <div className="col-11">
                        <div className="card bg-light">
                            <div className="card-header">
                                <strong className="mr-1">Palo Alto Little League</strong>
                                <span className="text-muted">delivered Mar 1, 2020</span>
                                <span
                                    className="d-none d-lg-block float-right secondary rounded border-muted px-1 text-muted">
                                         <FontAwesomeIcon icon={faExclamationCircle}/>
                                    </span>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">COVID-19 Response</h4>
                                <p className="card-text">Due to the escalation of the covid-19 pandemic, PA little
                                    league will be terminating the season early. Any games that umpires have signed
                                    up for will be dropped.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-auto mb-4">
                    <div className="col-1"></div>
                    <div className="col-11 text-center">
                        <a href="/">View more</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed;