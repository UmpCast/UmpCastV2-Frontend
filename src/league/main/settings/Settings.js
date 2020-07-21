import React from 'react'

import LeagueProfile from "./LeagueProfile"
import LeagueUmpires from "./umpireDefaults/UmpireDefaults"
import Divisions from "./Divisions"
import Payouts from "./Payouts"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Nav, Row, Col } from "react-bootstrap"

export default function Settings() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="payouts">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column mng-umps">
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" className="bg-light text-secondary rounded-top disabled">
                                <div className="d-inline-flex justify-content-center">
                                    <div className="d-inline-flex flex-wrap bg-secondary rounded p-1 mr-2 mt-1">
                                        <FontAwesomeIcon
                                            className="text-white fa-lg"
                                            icon={['fas', 'meteor']} />
                                    </div>
                                    <div className="my-auto d-flex flex-column">
                                        <div className="my-auto flex-shrink-0">
                                            <p className="mb-0"><strong>Palo Alto Little League</strong></p>
                                        </div>
                                        <small className="text-muted" style={{ "lineHeight": .5 }}>League Settings</small>
                                    </div>
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="profile" className="text-muted rounded-0 border-bottom">
                                Profile
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="umpires" className="text-muted rounded-0 border-bottom">
                                Umpires
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="divisions" className="text-muted rounded-0 border-bottom">
                                Divisions
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="payouts" className="text-muted rounded-0 border-bottom">
                                Payouts
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="billing" className="text-muted rounded-0 border-bottom">
                                Billing
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="profile">
                            <LeagueProfile />
                        </Tab.Pane>
                        <Tab.Pane eventKey="umpires">
                            <LeagueUmpires />
                        </Tab.Pane>
                        <Tab.Pane eventKey="divisions">
                            <Divisions />
                        </Tab.Pane>
                        <Tab.Pane eventKey="payouts">
                            <Payouts />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
