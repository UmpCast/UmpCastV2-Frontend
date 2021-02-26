import React from "react"
import { Link } from "react-router-dom"

import { Nav } from "react-bootstrap"

export default function BannerSubNav(props) {

    const { league, subjects, active } = props

    const ListNavs = subjects.map(subject =>
        <SubNavItem
            {...{ league, subject, active }}
            key={subject} />
    )

    return (
        <Nav variant="Tabs ump-sub-nav">
            {ListNavs}
        </Nav>
    )
}

const SubNavItem = ({ league, subject, active }) => (
    <Nav.Item
        key={subject}
        variant="light"
        className={`mx-1 px-auto text-muted 
        ${subject === "umpires" ? " d-none d-lg-block" : null}`}>
        <Nav.Link
            as={Link}
            to={`/league/${league.pk}/${subject}`}
            className={active === subject ? "active" : null}>
            <p className="mb-1">
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </p>
        </Nav.Link>
    </Nav.Item>
)