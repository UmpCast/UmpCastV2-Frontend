import React, { Fragment, useContext } from "react"
import { Link } from "react-router-dom"

import UserContext from "UserContext"

import ManagerLinks from "./ManagerLinks"
import UmpireLinks from "./UmpireLinks"
import ProfileLinks from "./ProfileLinks"

import { Navbar, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {

    const [{ user }, ] = useContext(UserContext)

    return (
        <Navbar expand="sm" variant="dark" bg="secondary">
            <Navbar.Brand href="/"><FontAwesomeIcon icon={["fas", "mountain"]} /> UmpCast</Navbar.Brand>
            <Navbar.Toggle data-toggle="collapse" data-target="#responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {getLinks(user.account_type)}
            </Navbar.Collapse>
        </Navbar>
    );
}

const getLinks = account_type => {
    switch (account_type) {
        case "manager":
            return (
                <Fragment>
                    <ManagerLinks />
                    <ProfileLinks />
                </Fragment>
            )
        case "umpire":
            return (
                <Fragment>
                    <UmpireLinks />
                    <ProfileLinks />
                </Fragment>
            )
        default:
            return guestLinks
    }
}

const guestLinks = (
    <Fragment>
        <Nav className="mr-auto" />
        <Nav>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
    </Fragment>
)

export default Header