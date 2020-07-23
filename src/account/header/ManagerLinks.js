import React, { useState, useContext, useEffect } from 'react'
import { Link } from "react-router-dom"

import UserContext from "UserContext"
import CreateLeague from "./CreateLeague"

import { fetchUserLeagues } from "account/promises"

import { Nav, NavDropdown } from "react-bootstrap"

export default function ManagerLinks() {

    const { user, token } = useContext(UserContext)[0]

    const [myLeagues, setMyLeagues] = useState([])

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        fetchUserLeagues({token: token})
        .then( payload => {
            setMyLeagues(payload.leagues)
        })
    }, [user])

    const formatted_leagues = myLeagues.map(league => (
        <NavDropdown.Item as={Link} to={`/league/${league.pk}`} key={league.title} >
            {league.title}
        </ NavDropdown.Item>
    ))

    return (
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/games">Games</Nav.Link>
            <NavDropdown title="Leagues">
                {formatted_leagues}
                <NavDropdown.Item onClick={handleShow} className="text-primary">
                    + Your League
                </NavDropdown.Item>
                <CreateLeague show={show} handleClose={handleClose} />
            </NavDropdown>
        </Nav>
    )
}
