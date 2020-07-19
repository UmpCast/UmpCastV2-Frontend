import React from 'react'

import LeagueUmpires from "./LeagueUmpires"
import PendingUmpires from "./PendingUmpires"

import { Tab, Nav, Row, Col } from "react-bootstrap"
import "../styles/mngUmps.css"

export default function ManageUmpires() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="league-umps">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column mng-umps">
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" className="bg-light text-secondary rounded-top disabled">
                                <strong>Management Center</strong>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="league-umps" className="text-muted rounded-0 rounded-0">
                                League Umpires
                                    </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="pending-umps" className="text-muted rounded-bottom">
                                Pending Umpires</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="league-umps">
                            <LeagueUmpires />
                        </Tab.Pane>
                        <Tab.Pane eventKey="pending-umps">
                            <PendingUmpires />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
