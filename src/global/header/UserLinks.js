import React from 'react'
import { Link } from "react-router-dom"

import useUser from "common/hooks"

import { CustomToggle, ProfilePicture } from "common/components"
import PrimaryBaseball from "assets/primary_baseball.png"

import { Nav, Dropdown } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UserLinks({ setExpanded }) {

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
                        className="d-inline-flex mt-2 mt-sm-0"
                        style={{ cursor: "pointer" }}>
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
                        to="/settings/leagues"
                        onClick={() => setExpanded(false)}>
                        Leagues
                    </Dropdown.Item>

                    <Dropdown.Item
                        as={Link}
                        to="/settings"
                        onClick={() => setExpanded(false)}>
                        Settings
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        as={Link}
                        to="/login"
                        onClick={() => { setExpanded(false); logout(); }}>
                        Logout
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    )
}
