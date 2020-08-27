import React from 'react'

import Loader, { SettingsHeader, SettingsNav, ProfilePicture } from "common/components"
import LeagueContainer from "components/league/LeagueContainer"

import { Row, Col, Nav } from "react-bootstrap"
import darkMeteor from "assets/dark_meteor.png"

export default function SettingsContainer({ league, active, children }) {

    const { league_picture } = league

    const subjects = [
        "profile",
        "umpires",
        "divisions",
        // TODO "payouts",
        // TODO "billing"
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
                                profilePicture={
                                    <ProfilePicture
                                        src={league_picture}
                                        alt={darkMeteor}
                                        size={25}
                                        className="rounded mr-2 my-auto" />
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