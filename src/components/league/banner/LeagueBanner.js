import React from "react"

import BannerSubNav from "./BannerSubNav"
import Loader from "common/components"

import LeagueDetails from "./BannerDetails"
import { Container, Row } from "react-bootstrap"

export default function LeagueBanner(props) {

    const { league, active, noDetails, noSubNav } = props

    const subjects = [
        "announcements",
        "calendar",
        "umpires",
        "urgent",
        "settings"
    ]

    return (
        <div className="px-3 pt-1 bg-light border-bottom">
            <Container className="px-5">
                <Loader dep={[!noDetails]}>
                    <Row className="my-3">
                        <LeagueDetails league={league} />
                    </Row>
                </Loader>
                <Loader dep={[!noSubNav]}>
                    <Row>
                        <BannerSubNav
                            {...{ league, subjects, active }} />
                    </Row>
                </Loader>
            </Container>
        </div>
    )
}