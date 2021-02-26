import React from "react"

import useUser from "common/hooks"

import Loader from "common/components"

import BannerSubNav from "./BannerSubNav"
import LeagueDetails from "./BannerDetails"

import { Container, Row } from "react-bootstrap"

export default function LeagueBanner(props) {

    const { league, active, noDetails, noSubNav } = props

    const isManager = useUser().user.account_type === "manager"

    let subjects = [
        "announcements",
        "calendar",
    ]

    if (isManager)
        subjects.push.apply(subjects, [
            // TODO "urgent",
            "umpires",
            "settings"
        ])

    return (
        <div className="px-0 px-md-3 pt-1 bg-light border-bottom">
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