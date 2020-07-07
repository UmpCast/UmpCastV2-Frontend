import React, { Fragment, useContext } from 'react';
import { Link } from "react-router-dom"
import UserContext from "../../UserContext"

import { Navbar, Nav, Button } from "react-bootstrap";

const Header = () => {
    const [{user, isAuthenticated}, setUser] = useContext(UserContext)

    const toggleAuthenticated = () =>{
        setUser({isAuthenticated: !isAuthenticated})
    }
    
    const authLinks = (
        <Nav>
            <Navbar.Text className="mr-3">
                <strong>
                    {user ? `Welcome ${user.username}` : ''}
                </strong>
            </Navbar.Text>
            <Button onClick={toggleAuthenticated} className="nav-link btn btn-sm btn-info text-light">
                Logout
                </Button>
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