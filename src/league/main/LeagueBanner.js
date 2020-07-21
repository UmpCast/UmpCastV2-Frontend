import React, { Fragment } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Button, Nav, Tab } from "react-bootstrap"

import "./league.css"

export default function LeagueBanner() {
    return (
        <Fragment>
            <div className="px-3 pt-1 bg-light border-bottom l-banner">
                <Container className="px-5">
                    <div className="row my-3">
                        <div className="ml-3 d-inline-flex align-items-center">
                            <FontAwesomeIcon icon={["fas", "meteor"]} className="fa-4x rounded text-white bg-dark p-2 mr-3" />
                            <div className="d-flex flex-column">
                                <h3 className="my-0 mr-2"><strong>Palo Alto Little League</strong></h3>
                                <small className="my-0 text-muted">City-wide little league for kids age 8-14</small>
                                <small>
                                    <FontAwesomeIcon className="mt-1 fa-sm mr-1 text-primary" icon={['fas', 'link']} />
                                    <a href="http://pabaseball.org" className="text-secondary mr-2">pabaseball.org</a>
                                    <FontAwesomeIcon className="mt-1 fa-sm mr-1 text-primary" icon={['far', 'envelope']} />
                                    <a className="text-secondary">umpcast@gmail.com</a>
                                </small>
                            </div>
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
                                <Nav.Link eventKey="urgent">
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