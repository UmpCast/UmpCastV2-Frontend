import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {faUserAlt, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import './game.css'

class Cast extends Component {
    render() {
        return (
            <div className="px-1 pt-4 noselect">
                <div className="row px-2">
                    <div className="col text-center">
                        <h5 className="mx-auto"><span className="badge badge-success">Open for Backups</span></h5>
                    </div>
                </div>
                <div className="row pt-2">
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <div className="border-secondary-dashed">
                            <Card className="text-center border-0 text-muted">
                                <Card.Body className="p-0">
                                    <div className="list-group-item-action border-0 py-3">
                                        <Card.Title className="mb-0 mt-1">
                                            <FontAwesomeIcon className="mr-2 fa-sm" icon={faPlus}/>
                                            <strong>Click to add</strong>
                                        </Card.Title>
                                        <div
                                            className="d-inline-flex flex-wrap p-4 my-4 rounded-circle text-white fa-4x"
                                            style={{"background-color": "#E8EAED"}}>
                                            <FontAwesomeIcon className="text-white"
                                                             icon={faUserAlt}/>
                                        </div>
                                        <Card.Text className="mb-1">Yourself</Card.Text>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <div className="border-secondary-custom">
                            <Card className="text-center border-0">
                                <Card.Body>
                                    <Card.Title className="mb-0">Backup</Card.Title>
                                    <div
                                        className="d-inline-flex flex-wrap bg-secondary p-4 my-4 rounded-circle text-white fa-4x">
                                        <FontAwesomeIcon className="text-white"
                                                         icon={faUserAlt}/>
                                    </div>
                                    <Card.Text><a href="/#/game/1">Jonathan Kao</a></Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-3 col-xl-2 p-2">
                        <div className="border-secondary-custom">
                            <Card className="text-center border-0">
                                <Card.Body>
                                    <Card.Title className="mb-0">Backup</Card.Title>
                                    <div
                                        className="d-inline-flex flex-wrap bg-secondary p-4 my-4 rounded-circle text-white fa-4x">
                                        <FontAwesomeIcon className="text-white"
                                                         icon={faUserAlt}/>
                                    </div>
                                    <Card.Text><a href="/#/game/1">Ingrid Lee</a></Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cast;