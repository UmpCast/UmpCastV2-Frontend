import React, { Fragment, useContext } from 'react';
import { Link } from "react-router-dom"
import UserContext from "../../UserContext"

import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
    const [{ user, isAuthenticated }, setUser] = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem('token')
        setUser({
            isAuthenticated: false,
            isConfigured: false,
            user: {},
            token: null
        })
    }

    const authLinks = (
        <Nav>
            <Navbar.Text className="mr-3">
                <strong>
                    {user ? `Hey ${user.first_name}!` : ''}
                </strong>
            </Navbar.Text>
            <Nav.Link onClick={() => logout()} className="mr-3">
                <strong>
                    Logout
                </strong>
            </Nav.Link>
        </Nav>
    )

    const guestLinks = (
        <Nav>
            <Link to="/register" className="nav-link">
                Register
                </Link>
            <Link to="/login" className="nav-link">
                Login
                </Link>
        </Nav>
    )

    return (
        <Fragment>
            <Navbar expand="sm" variant="light" bg="light">
                <Navbar.Brand href="/">UmpCast</Navbar.Brand>
                <Navbar.Toggle data-toggle="collapse" data-target="#responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" />
                    {isAuthenticated ? authLinks : guestLinks}
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );
}

export default Header