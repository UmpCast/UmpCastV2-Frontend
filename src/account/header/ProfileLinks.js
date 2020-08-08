import React, { useContext } from 'react'
import { Link, Redirect } from "react-router-dom"

import UserContext from "UserContext"

import {Nav, NavDropdown} from "react-bootstrap"
import ProfileIcon from "../icon/ProfileIcon"

export default function Logout() {
    const [, setUser] = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem("token")
        setUser({
            isAuthenticated: false,
            isConfigured: false,
            user: {},
            token: null
        })
        Redirect("/login")
    }

    return (
        <Nav>
            <ProfileIcon
                icon={["fas", "baseball-ball"]}
                variant="secondary"
                size="fa-lg"
                custom="my-auto"
            />
            <NavDropdown title="" alignRight id="collasible-nav-dropdown" className="mb-0 pb-0">
                <NavDropdown.Item as={Link} to="/settings/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings/security">Security</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={() => logout()}>Logout</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}
