import React from "react"
import { Link } from "react-router-dom"

import LeagueDetails from "./LeagueDetails"
import { Container, Nav, Row } from "react-bootstrap"

export default function LeagueBanner(props) {

    const {pk, active} = props

    const subjects = ["announcements", "calendar", "umpires", "urgent", "settings"]
    return (
        <div className="px-3 pt-1 bg-light border-bottom">
            <Container className="px-5">
                <Row className="my-3">
                    <LeagueDetails />
                </Row>
                <Row>
                    <Nav variant="Tabs ump-sub-nav">
                        {formatSubNavs(pk, subjects, active)}
                    </Nav>
                </Row>
            </Container>
        </div>
    )
}

export const formatSubNavs = (pk, subjects, active) => {
    return subjects.map(subject => {
        const subject_caps = subject.charAt(0).toUpperCase() + subject.slice(1)
        return (
            <Nav.Item key={subject} variant="light" className="mx-1 px-auto text-muted">
                <Nav.Link
                    as={Link}
                    to={`/league/${pk}/${subject}`}
                    className={active === subject ? "active" : null}>
                    <p className="mb-1">{subject_caps}</p>
                </Nav.Link>
            </Nav.Item>
        )
    })
}