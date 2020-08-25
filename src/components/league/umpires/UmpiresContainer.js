import React from 'react'

import Loader, { SettingsHeader, SettingsNav } from "common/components"

import LeagueContainer from "components/league/LeagueContainer"

import { Row, Col, Nav } from "react-bootstrap"

export default function UmpiresContainer(props) {

    const { league, active } = props

    const subjects = ["existing", "pending"]

    return (
        <LeagueContainer league={league} active="umpires" >
            <Row>
                <Col sm={3}>
                    <Loader dep={[league]}>
                        <Nav
                            variant="pills"
                            className="flex-column ump-settings-nav">
                            <SettingsHeader
                                title="Management Center"
                            />
                            <SettingsNav
                                {...{ active, subjects, toPath: toPath(league) }} />
                        </Nav>
                    </Loader>
                </Col>
                <Col sm={9}>
                    {props.children}
                </Col>
            </Row>
        </LeagueContainer>
    )
}

const toPath = league => subject => (
    `/league/${league.pk}/umpires/${subject}`
)
