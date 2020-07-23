import React from 'react'

import { SettingsNavHeader, formatSettingsNavs } from "tools/Display"

import {Row, Col, Nav} from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SettingsNav(props) {

    const subjects = ["profile", "umpires", "divisions", "payouts", "billing"]
    const {pk, active} = props
    return (
        <Row>
            <Col sm={3}>
                <Nav variant="pills" className="flex-column ump-settings-nav">
                    <SettingsNavHeader
                        icon={
                            <FontAwesomeIcon
                                className="text-white fa-lg"
                                icon={['fas', 'meteor']}
                            />
                        }
                        title="Palo Alto Little League"
                        footer="League Settings"
                    />
                    {formatSettingsNavs(active, subjects, subject => `/league/${pk}/settings/${subject}`)}
                </Nav>
            </Col>
            <Col sm={9}>
                {props.children}
            </Col>
        </Row>
    )
}
