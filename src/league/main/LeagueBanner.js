import React, { Fragment } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button, Nav, Tab } from "react-bootstrap"

import "./league.css"

export default function LeagueBanner() {
    return (
        <Fragment>
            <div className="px-3 pt-3 bg-light border-bottom l-banner">
                <Container className="px-5">
                    <div className="row my-3">
                        <div className="ml-3 d-inline-flex align-items-center">
                            <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-3x rounded text-white bg-dark p-2 mr-3" />
                            <h3><strong>Palo Alto Little League</strong></h3>
                        </div>
                    </div>
                    <div className="row">
                        <Nav variant="Tabs">
                            <Nav.Item variant="light" className="mx-1 px-auto text-muted">
                                <Nav.Link eventKey="announcements">
                                    <p className="mb-1">Announcements</p>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item variant="light" className="mx-1 text-muted">
                                <Nav.Link eventKey="calendar">
                                    <p className="mb-1">Calendar</p>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item variant="light" className="mx-1 text-muted">
                                <Nav.Link eventKey="umpires">
                                    <p className="mb-1">Umpires</p>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item variant="light" className="mx-1 text-muted">
                                <Nav.Link eventKey="urgent_games">
                                    <p className="mb-1">Urgent Games</p>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item variant="light" className="mx-1 text-muted">
                                <Nav.Link eventKey="settings">
                                    <p className="mb-1">Settings</p>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </Container>
            </div>
        </Fragment>
    )
}