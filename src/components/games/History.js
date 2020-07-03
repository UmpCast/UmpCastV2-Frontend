import React, {Component} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheckCircle, faSortDown} from "@fortawesome/free-solid-svg-icons";
import {Card, Dropdown} from "react-bootstrap";

import "../home/dashboard.css"
import HistoryGame from "./HistoryGame";

const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <p ref={ref}
       onClick={(e) => {
           e.preventDefault();
           onClick(e);
       }}
       className="mb-0 text-muted"
    >
        {children}
    </p>
));

class History extends Component {

    render() {
        return (
            <div className="px-1 mt-3">
                <div className="card border-0 mb-3">
                    <h6 className="d-inline card-header border p-3">
                        <strong>
                            <span className="mr-3 text-success"><FontAwesomeIcon className="mr-2"
                                                                                 icon={faCheckCircle}/>5 Completed</span>
                            <span className="text-muted"><FontAwesomeIcon className="mr-2"
                                                                          icon={faBan}/>1 Canceled</span>
                        </strong>
                        <Dropdown className="float-right">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <strong className="mr-1 cursor-pointer">
                                    <span className="mr-1">Filter</span>
                                    <FontAwesomeIcon className="pb-1" icon={faSortDown}/>
                                </strong>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </h6>
                    <Card.Body className="p-0">
                        <HistoryGame/>
                        <div className="list-group-item border-top-0 pb-0">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column card-title">
                                    <div className="d-inline-flex">
                                        <h4 className="mb-auto mr-2">
                                            <strong>
                                                <a href="/" className="text-secondary">Agile vs. Stanford</a>
                                            </strong>
                                        </h4>
                                        <p className="my-auto badge badge-pill badge-success px-2 py-0"
                                           style={{"line-height": "1.7"}}>
                                            <FontAwesomeIcon className="mr-1" icon={faCheckCircle}/> Completed
                                        </p>
                                    </div>
                                    <p className="mb-0 mt-1">
                                        <span className="text-uppercase text-muted">Majors Base</span>
                                    </p>
                                </div>
                                <div className="d-flex flex-column text-right card-title flex-shrink-0">
                                    <h5 className="mb-auto mt-1 mr-1"><strong>Mar 04</strong></h5>
                                    <h5 className="mb-0 text-muted mr-1"><small>5PM - 7PM</small></h5>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </div>
            </div>
        );
    }
}

export default History;