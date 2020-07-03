import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const HistoryGame = () => (
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
)

export default HistoryGame