import React, { Fragment, useContext } from 'react'
import { useParams } from "react-router-dom";

import useUser, { useApi } from "hooks"
import basicApi from "promises"

import { SettingsNavHeader, formatSettingsNavs } from "tools/Display"

import LeagueBanner from "../LeagueBanner"
import LeagueProfile from "./LeagueProfile"
import LeagueUmpires from "./umpireDefaults/UmpireDefaults"
import Divisions from "./divisions/DivisionsSettings"
import Payouts from "./Payouts"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Tab, Nav, Row, Col } from "react-bootstrap"

export default function Settings() {

    const { pk } = useParams()
    const { token } = useUser()[0]
    const league = useApi(() => basicApi("api/leagues/", { pk: pk, token: token }))[0]

    const subjects = ["profile", "umpires", "divisions", "payouts", "billing"]

    const subject_navs = formatSettingsNavs(subjects)

    return (
        <Fragment>
            <LeagueBanner pk={pk} active="settings" league={league} />
            <div className="px-3 pt-3">
                <Container className="px-5">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="divisions">
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
                                    {subject_navs}
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="profile">
                                        <LeagueProfile />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="umpires">
                                        <LeagueUmpires />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="divisions">
                                        <Divisions />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="payouts">
                                        <Payouts />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        </Fragment>
    )
}