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
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-column card-title">
                                                <h4 className="mb-auto">
                                                    Mar 04 · Agile vs. Stanford
                                                </h4>
                                                <div className="mt-3">
                                                    <p className="mb-0">
                                                        <strong>Role: </strong><span className="text-uppercase">Majors Base</span>
                                                    </p>
                                                    <p className="mb-0">
                                                        <strong>Location:</strong> Mitchell Ballpark
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-column text-right card-title flex-shrink-0">
                                                <h5 className="mb-auto"><small><strong>5PM - 7PM</strong></small></h5>
                                                <div>
                                                    <h5 className="mb-2">
                                                        <strong>Casted:</strong>
                                                    </h5>
                                                    <div className="row mx-auto float-right">
                                                        <div className="col-auto text-right p-0 mr-1"
                                                             data-tip="Base: Max C.">
                                                            <div
                                                                className="d-inline-flex flex-wrap bg-primary rounded p-1 border border-light">
                                                                <FontAwesomeIcon className="text-white"
                                                                                 transform={{rotate: 30}}
                                                                                 icon={faBaseballBall}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto text-right p-0 mr-1">
                                                            <div
                                                                className="d-inline-flex rounded flex-wrap bg-success p-1 border border-light">
                                                                <FontAwesomeIcon className="text-white"
                                                                                 transform={{rotate: 30}}
                                                                                 icon={faBaseballBall}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto text-right p-0 mr-1">
                                                            <div
                                                                className="d-inline-flex rounded flex-wrap p-1 bg-info border border-light">
                                                                <FontAwesomeIcon className="text-white"
                                                                                 transform={{rotate: 30}}
                                                                                 icon={faBaseballBall}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto text-right p-0">
                                                            <div
                                                                className="d-inline-flex rounded flex-wrap p-1 border-custom">
                                                                <FontAwesomeIcon className="text-white"
                                                                                 transform={{rotate: 30}}
                                                                                 icon={faBaseballBall}/>
                                                            </div>
                                                        </div>
                                                        <ReactTooltip place="bottom"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </div>
                <div className="row mx-auto mb-4">
                    <div className="col-1 px-0 text-center">
                        <div className="d-inline-flex flex-wrap bg-primary rounded p-2">
                            <FontAwesomeIcon className="text-white fa-2x" transform={{rotate: 30}}
                                             icon={faBaseballBall}/>
                        </div>
                    </div>
                    <div className="col-11">
                        <div className="card bg-light">
                            <div className="card-header">
                                <strong className="mr-1">UmpCast</strong>
                                <span className="text-muted">delivered Mar 4, 2020</span>
                                <span
                                    className="d-none d-lg-block float-right secondary rounded border-muted px-1 text-muted">
                                         <FontAwesomeIcon icon={faWrench}/>
                                    </span>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">Update to our Policy</h4>
                                <p className="card-text">We have recently updated our privacy policy. Please
                                    navigate to
                                    the home page and
                                    review the changes.</p>
                            </div>
                        </div>
                    </div>
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