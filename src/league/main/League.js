import React from "react"

import LeagueBanner from "./LeagueBanner"
import LeagueDetails from "./LeagueDetails"

import {Tab} from "react-bootstrap"

export default function League() {
    return (
        <Tab.Container defaultActiveKey="settings">
            <LeagueBanner />
            <LeagueDetails />
        </Tab.Container>
    )
}
