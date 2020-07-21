import React from "react"

import LeagueDetails from "./LeagueDetails"
import { Container, Nav } from "react-bootstrap"

export default function LeagueBanner() {
    return (
        <div className="px-3 pt-1 bg-light border-bottom">
            <Container className="px-5">
                <div className="row my-3">
                    <LeagueDetails />
                </div>
                <div className="row">
                    <Nav variant="Tabs ump-sub-nav">
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
    )
}