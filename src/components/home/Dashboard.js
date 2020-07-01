import React from "react"
import ReactTooltip from "react-tooltip"
import {Tabs, Tab, Container} from "react-bootstrap"

const Dashboard = () => (
    <div className="row mt-5 mx-lg-5">
        <div className="col-12 col-md-4 mt-3">
            <div className="card mb-3 border-0">
                <h5 className="card-header border border-bottom-0 rounded-0"><strong>Your Signups</strong></h5>
                <div className="card-body p-0">
                    <div className="list-group rounded-0">
                        <div className="list-group-item list-group-item-action flex-column text-center p-0 active">
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
                        <div className="list-group-item list-group-item-action flex-column text-center p-0 active">
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
                                <ReactTooltip place="right" offset={{top: 0, bottom: 0, left: 0, right: 0}}/>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-md-8 pl-lg-5 mt-3">
            <Tabs defaultActiveKey="feed" id="uncontrolled-tab-example">
                <Tab eventKey="feed" title="Feed">

                </Tab>
                <Tab eventKey="history" title="History">

                </Tab>
                <Tab eventKey="visibility" title="Visibility">

                </Tab>
            </Tabs>
        </div>
    </div>
)

export default Dashboard