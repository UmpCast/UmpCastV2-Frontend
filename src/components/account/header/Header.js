import React, { Fragment } from "react"
import { Link } from "react-router-dom"

import useUser from "global/hooks"

import Loader from "common/Components"

import UserLinks from "./UserLinks"
import ProfileLinks from "./ProfileLinks"

import { Navbar, Nav } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Header = () => {

    const { isAuthenticated, isConfigured } = useUser()

    return (
        <Navbar expand="sm" variant="dark" bg="secondary">
            <LogoNav />

            <Navbar.Toggle
                data-toggle="collapse"
                data-target="#responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav">
                <Loader dep={isAuthenticated && isConfigured}>
                    <UserLinks />
                    <ProfileLinks />
                </Loader>
                <Loader dep={!isAuthenticated && !isConfigured}>
                    <GuestLinks />
                </Loader>
            </Navbar.Collapse>
        </Navbar>
    );
}

const LogoNav = () => (
    <Navbar.Brand href="/">
        <FontAwesomeIcon
            icon="mountain"
            className="mr-1"/>
        UmpCast
    </Navbar.Brand>
)

const GuestLinks = () => (
    <Fragment>
        <Nav className="mr-auto" />
        <Nav>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </Nav>
    </Fragment>
)

export default Header