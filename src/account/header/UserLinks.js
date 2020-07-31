import React, { useState } from 'react'
import { Link } from "react-router-dom"

import useUser, { useApi } from "hooks"
import basicApi from "promises"

import CreateLeague from "./CreateLeague"

import { Nav, NavDropdown } from "react-bootstrap"

export default function UserLinks() {

    const User = useUser()[0]
    const { user, token } = User

    const myUls = useApi(() => basicApi("api/user-league-status/",
        {
            token: token,
            params: {
                user: user.pk,
                request_status: "accepted"
            }
        })
    )

    const uls = myUls[0]

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    let formatted_uls = null

    if (uls && uls.length > 0) {
        formatted_uls = uls.map(status => (
            <NavDropdown.Item as={Link} to={`/league/${status.league.pk}`} key={status.league.pk}>
                {status.league.title}
            </ NavDropdown.Item>
        ))
    } else {
        formatted_uls =
            <NavDropdown.Item disabled>
                No Leagues
            </ NavDropdown.Item>
    }

    return (
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>
            <NavDropdown title="Leagues">
                {formatted_uls}
                {User.user.account_type === "manager" ?
                    <NavDropdown.Item onClick={handleShow} className="text-primary">
                        + Your League
                    </NavDropdown.Item>
                    : null}
                <CreateLeague show={show} handleClose={handleClose} myUls={myUls} />
            </NavDropdown>
        </Nav>
    )
}
