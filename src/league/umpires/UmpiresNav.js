import React from 'react'

import { SettingsNavHeader, formatSettingsNavs } from "tools/Display"

import {Row, Col, Nav} from "react-bootstrap"

export default function UmpiresNav(props) {

    const subjects = ["existing", "pending"]

    const {pk, active} = props
    return (
        <Row>
            <Col sm={3}>
                <Nav variant="pills" className="flex-column ump-settings-nav">
                    <SettingsNavHeader
                        title="Management Center"
                    />
                    {formatSettingsNavs(active, subjects, subject => `/league/${pk}/umpires/${subject}`)}
                </Nav>
            </Col>
            <Col sm={9}>
                {props.children}
            </Col>
        </Row>
    )
}
