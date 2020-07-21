import React from 'react'

import { SettingsNavHeader, formatSettingsNavs } from "../../tools/Display"
import UserProfile from "./UserProfile"
import UserSecurity from "./UserSecurity"
import UserNotifications from "./UserNotifications"
import UserLeagues from "./UserLeagues"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Tab, Nav, Row, Col } from "react-bootstrap"

export default function UserSettings() {

    const subjects = ["profile", "security", "notifications", "leagues"]

    const settings_navs = formatSettingsNavs(subjects)

    return (
        <Container className="mt-4 px-5">
            <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                <Row className="px-4">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column ump-settings-nav">
                            <SettingsNavHeader
                                icon={
                                    <FontAwesomeIcon
                                        className="text-white fa-lg"
                                        icon={['fas', 'baseball-ball']}
                                        transform={{ rotate: 30 }}
                                    />
                                }
                                title="Victor Lin"
                                footer="Personal Settings"
                            />
                            {settings_navs}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="profile">
                                <UserProfile />
                            </Tab.Pane>
                            <Tab.Pane eventKey="security">
                                <UserSecurity />
                            </Tab.Pane>
                            <Tab.Pane eventKey="notifications">
                                <UserNotifications />
                            </Tab.Pane>
                            <Tab.Pane eventKey="leagues">
                                <UserLeagues />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}
