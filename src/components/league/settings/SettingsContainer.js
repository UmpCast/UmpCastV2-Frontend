import React from 'react'

import Loader, { SettingsHeader, SettingsNav } from "common/components"
import LeagueContainer from "components/league/LeagueContainer"

import { Row, Col, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SettingsContainer({ league, active, children }) {

    const subjects = [
        "profile",
        "umpires",
        "divisions",
        "payouts",
        "billing"
    ]

    return (
        <LeagueContainer league={league} active="settings">
            <Row>
                <Col sm={3}>
                    <Loader dep={[league]}>
                        <Nav
                            variant="pills"
                            className="flex-column ump-settings-nav">
                            <SettingsHeader
                                icon={
                                    <FontAwesomeIcon
                                        className="text-white fa-lg"
                                        icon={['fas', 'meteor']}
                                    />
                                }
                                title="Palo Alto Little League"
                                footer="League Settings"
                            />
                            <SettingsNav
                                {...{ active, subjects, toPath: toPath(league) }} />
                        </Nav>
                    </Loader>
                </Col>
                <Col sm={9}>
                    {children}
                </Col>
            </Row>
        </LeagueContainer>
    )
}

const toPath = league => subject => (
    `/league/${league.pk}/settings/${subject}`
)