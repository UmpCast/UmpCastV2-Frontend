import React from "react"

import LeagueBanner from "./LeagueBanner"
import LeagueTabs from "./LeagueTabs"

import {Tab} from "react-bootstrap"

export default function League() {
    return (
        <Tab.Container defaultActiveKey="settings">
            <LeagueBanner />
            <LeagueTabs />
        </Tab.Container>
    )
}
