import React from 'react'

import { SettingsNavHeader, formatSettingsNavs } from "../../../tools/Display"
import LeagueProfile from "./LeagueProfile"
import LeagueUmpires from "./umpireDefaults/UmpireDefaults"
import Divisions from "./Divisions"
import Payouts from "./Payouts"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Nav, Row, Col } from "react-bootstrap"

export default function Settings() {

    const subjects = ["profile", "umpires", "divisions", "payouts", "billing"]

    const subject_navs = formatSettingsNavs(subjects)

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="payouts">
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
    )
}