import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom"
import UserContext from "./UserContext"

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import ProfileIcon from "./account/icon/ProfileIcon"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Header = () => {
    const [{ isAuthenticated }, setUser] = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem("token")
        setUser({
            isAuthenticated: false,
            isConfigured: false,
            user: {},
            token: null
        })
    }

    const authLinks = (
        <Fragment>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                <Nav.Link  as={Link} to="/calendar">Calendar</Nav.Link>
                <Nav.Link as={Link} to="/games">Games</Nav.Link>
                <NavDropdown title="Leagues" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/league/1">Palo Alto Little League</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Saratoga Little League</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <ProfileIcon
                    icon={["fas", "baseball-ball"]}
                    variant="secondary"
                    size="fa-lg"
                    custom="my-auto"
                />
                <NavDropdown title="" alignRight id="collasible-nav-dropdown" className="mb-0 pb-0">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Notifications</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick = {() => logout()}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Nav className="mr-auto" />
            <Nav>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav>
        </Fragment>
    )

    return (
        <Navbar expand="sm" variant="dark" bg="secondary">
            <Navbar.Brand href="/"><FontAwesomeIcon icon={["fas", "mountain"]}/> UmpCast</Navbar.Brand>
            <Navbar.Toggle data-toggle="collapse" data-target="#responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {isAuthenticated ? authLinks : guestLinks}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header