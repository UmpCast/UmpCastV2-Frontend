import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"

import useUser from "common/hooks"

import Loader from "common/components"

import LeagueLinks from "./LeagueLinks"
import UserLinks from "./UserLinks"

import { Navbar, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {

    const { isAuthenticated, isConfigured } = useUser()

    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar
            expand="sm"
            expanded={expanded}
            variant="dark"
            bg="secondary">
            <LogoNav />

            <Navbar.Toggle
                data-toggle="collapse"
                data-target="#responsive-navbar-nav"
                onClick={() => setExpanded(expanded ? false : "expanded")} />

            <Navbar.Collapse id="responsive-navbar-nav">
                <Loader dep={isAuthenticated && isConfigured}>
                    <LeagueLinks setExpanded={setExpanded} />
                    <UserLinks setExpanded={setExpanded} />
                </Loader>
                <Loader dep={!isAuthenticated && !isConfigured}>
                    <GuestLinks setExpanded={setExpanded} />
                </Loader>
            </Navbar.Collapse>
        </Navbar>
    );
}

const LogoNav = () => (
    <Navbar.Brand as={Link} to="/">
        <FontAwesomeIcon
            icon="mountain"
            className="mr-1" />
        UmpCast
    </Navbar.Brand>
)

const GuestLinks = ({setExpanded}) => (
    <Fragment>
        <Nav className="mr-auto" />
        <Nav>
            <Nav.Link
                as={Link}
                to="/register"
                onClick={() => setExpanded(false)}>
                Register
            </Nav.Link>
            <Nav.Link
                as={Link}
                to="/login"
                onClick={() => setExpanded(false)}>
                Login
            </Nav.Link>
        </Nav>
    </Fragment>
)

export default Header