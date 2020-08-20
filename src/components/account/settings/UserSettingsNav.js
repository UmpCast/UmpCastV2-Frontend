import React from 'react'

import { SettingsHeader, SettingsNav } from "common/Components"

import { Container, Row, Col, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserSettingsNav(props) {

    const subjects = ["profile", "security", "notifications", "leagues"]
    const { active } = props

    const toPath = subject => (
        `/settings/${subject}`
    )

    return (
        <Container className="mt-4 px-5">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column ump-settings-nav">
                        <SettingsHeader
                            icon={
                                <FontAwesomeIcon
                                    className="text-white fa-lg"
                                    icon={['fas', 'baseball-ball']}
                                />
                            }
                            title="Victor Lin"
                            footer="Personal Settings"
                        />
                        <SettingsNav
                            {...{active, subjects, toPath}} />
                    </Nav>
                </Col>
                <Col sm={9}>
                    {props.children}
                </Col>
            </Row>
        </Container>
    )
}
