import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBaseballBall} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const FullGame = () => (
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
                </div>
            </div>
        </div>
    </div>
)

export default FullGame