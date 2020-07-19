import React from "react"

import Umpires from "./umpire/Umpires"
import UrgentGames from "./urgent/Urgent"
import Settings from "./settings/Settings"

import { Container, Tab } from "react-bootstrap"

export default function LeagueDetails() {
    return (
        <div className="px-3 pt-3">
            <Container className="px-5">
                <Tab.Content>
                    <Tab.Pane eventKey="announcements">
                    </Tab.Pane>
                    <Tab.Pane eventKey="calendar">
                        <UrgentGames />
                    </Tab.Pane>
                    <Tab.Pane eventKey="umpires">
                        <Umpires />
                    </Tab.Pane>
                    <Tab.Pane eventKey="urgent">
                        <UrgentGames />
                    </Tab.Pane>
                    <Tab.Pane eventKey="settings">
                        <Settings />
                    </Tab.Pane>
                </Tab.Content>
            </Container>
        </div>
    )
}
