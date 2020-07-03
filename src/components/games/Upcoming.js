import React, {Component} from 'react';
import ReactTooltip from "react-tooltip";

class Upcoming extends Component {
    render() {
        return (
            <div className="card-body p-0">
                <div className="list-group rounded-0">
                    <div className="list-group-item list-group-item-action flex-column text-center p-0 bg-dark text-white">
                        <p className="mb-0">MAR 04</p>
                    </div>
                    <a href="/"
                       className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 float-left">Agile vs. Stanford</h5>
                            <div className="flex-grow-0 flex-shrink-0">
                                <small className="text-muted">9AM - 11AM</small>
                            </div>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="text-uppercase mb-0">Majors Plate</p>
                            <small className="bg-success text-white p-1 text-uppercase"
                                   data-tip="Be on-time!">casted</small>
                        </div>
                    </a>
                    <a href="#"
                       className="list-group-item list-group-item-action disabled">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 float-left">Say Hey Baseball Vs. Carmel Imports</h5>
                            <small className="text-muted flex-grow-0 flex-shrink-0">9AM - 11AM</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="text-uppercase mb-0">Majors Base</p>
                            <small className="bg-danger text-white p-1 text-uppercase" data-tip="Game is canceled" style={{'pointer-events': 'auto'}}>cancel</small>
                        </div>
                    </a>
                    <div className="list-group-item list-group-item-action flex-column text-center p-0 bg-dark text-white">
                        <p className="mb-0">MAR 07</p>
                    </div>
                    <a href="/"
                       className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 float-left">Yankees vs. White Sox</h5>
                            <small className="text-muted flex-grow-0 flex-shrink-0">2PM - 3PM</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="text-uppercase mb-0">AAA Plate</p>
                            <small className="bg-warning text-white p-1 text-uppercase"
                                   data-tip="You're a backup">in-line</small>
                        </div>
                    </a>
                    <a href="/"
                       className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 float-left">Pirates vs. Blue Jays</h5>
                            <small className="text-muted flex-grow-0 flex-shrink-0">6PM - 8PM</small>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <p className="text-uppercase mb-0">Majors Plate</p>
                            <small className="bg-success text-white p-1 text-uppercase"
                                   data-tip="Be on-time!">casted</small>
                        </div>
                    </a>
                </div>
            </div>
        );
    }
}

export default Upcoming;