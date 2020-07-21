import React from 'react'

import {formatSettingsNavs} from "../../../tools/Display"
import ManageUmpires from "./existing/ExistingUmpires"
import PendingUmpires from "./PendingUmpires"

import { Tab, Nav, Row, Col } from "react-bootstrap"
import { format } from 'date-fns'

export default function Umpires() {

    const subjects = ['League Umpires', 'Pending Umpires']

    const settings_navs = formatSettingsNavs(subjects)
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="League Umpires">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column ump-settings-nav">
                        <Nav.Item>
                            <Nav.Link eventKey="disabled" className="bg-light text-secondary ump-border-rounded-top disabled">
                                <strong>Management Center</strong>
                            </Nav.Link>
                        </Nav.Item>
                        {settings_navs}
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="League Umpires">
                            <ManageUmpires />
                        </Tab.Pane>
                        <Tab.Pane eventKey="Pending Umpires">
                            <PendingUmpires />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}
