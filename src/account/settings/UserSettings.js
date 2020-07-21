import React from 'react'

import UserProfile from "./UserProfile"
import UserSecurity from "./UserSecurity"
import UserNotifications from "./UserNotifications"
import UserLeagues from "./UserLeagues"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Tab, Nav, Row, Col } from "react-bootstrap"

export default function UserSettings() {
    return (
        <Container className="mt-4 px-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="user-leagues">
                <Row className="px-4">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mng-umps">
                            <Nav.Item>
                                <Nav.Link eventKey="disabled" className="bg-light text-secondary rounded-top disabled">
                                    <div className="d-inline-flex justify-content-center">
                                        <div className="d-inline-flex flex-wrap bg-secondary rounded p-1 mr-2 mt-1">
                                            <FontAwesomeIcon
                                                className="text-white fa-lg"
                                                icon={['fas', 'baseball-ball']}
                                                transform={{ rotate: 30 }} />
                                        </div>
                                        <div className="my-auto d-flex flex-column">
                                            <div className="my-auto flex-shrink-0">
                                                <p className="mb-0"><strong>Victor Lin</strong></p>
                                            </div>
                                            <small className="text-muted" style={{ "lineHeight": .5 }}>Personal Settings</small>
                                        </div>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="user-profile" className="text-muted rounded-0 border-bottom">
                                    Profile
                            </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="user-security" className="text-muted rounded-0 border-bottom">
                                    Security
                            </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="user-notifications" className="text-muted rounded-0 border-bottom">
                                    Notifications
                            </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="user-leagues" className="text-muted rounded-0 border-bottom">
                                    Leagues
                            </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="user-profile">
                                <UserProfile />
                            </Tab.Pane>
                            <Tab.Pane eventKey="user-security">
                                <UserSecurity />
                            </Tab.Pane>
                            <Tab.Pane eventKey="user-notifications">
                                <UserNotifications />
                            </Tab.Pane>
                            <Tab.Pane eventKey="user-leagues">
                                <UserLeagues />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}
