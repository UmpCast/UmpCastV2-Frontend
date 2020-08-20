import React from 'react'
import { Link, Redirect } from "react-router-dom"

import useUser from "global/hooks"

import { CustomToggle, ProfilePicture } from "common/Components"
import PrimaryBaseball from "assets/primary_baseball.png"

import { Nav, Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Logout() {

    const [User, setUser] = useUser(true)

    const { user } = User

    const logout = () => {
        localStorage.removeItem("token")
        setUser({
            isAuthenticated: false,
            isConfigured: false,
            user: {},
            token: null
        })
    }

    return (
        <Nav>
            <Dropdown>
                <Dropdown.Toggle
                    as={CustomToggle}
                    alignRight
                    id="collasible-nav-dropdown"
                    className="mb-0 pb-0">
                    <div 
                        className="d-inline-flex"
                        style={{cursor: "pointer"}}>
                        <ProfilePicture
                            src={user.profile_picture}
                            alt={PrimaryBaseball}
                            size={25}
                            className="rounded-circle border border-light mr-1" />
                        <FontAwesomeIcon
                            icon="sort-down"
                            className="text-light" />
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu alignRight>
                    <Dropdown.Item
                        as={Link}
                        to="/settings/profile">
                        Profile
                    </Dropdown.Item>

                    <Dropdown.Item
                        as={Link}
                        to="/settings">
                        Settings
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        as={Link}
                        to="/login"
                        onClick={logout}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    )
}
