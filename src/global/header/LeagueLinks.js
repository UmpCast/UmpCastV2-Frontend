import React, { useState } from 'react'
import { Link } from "react-router-dom"

import useUser, { useApi, useMountEffect } from "common/hooks"

import Loader from "common/components"
import CreateLeague from "./CreateLeague"

import { Nav, NavDropdown } from "react-bootstrap"

export default function LeagueLinks() {

    const Api = useApi(fetchUls)
    const User = useUser()

    const useUls = useState()
    const useShow = useState(false)

    const { user } = User
    const [uls, setUls] = useUls
    const [, setShow] = useShow

    useMountEffect(() => {
        Api.fetchUls(user.pk).then(
            res => setUls(res.data.results)
        )
    })

    return (
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
            <Nav.Link as={Link} to="/game/search">Games</Nav.Link>
            <NavDropdown title="Leagues">

                <Loader dep={uls}>
                    <UlsNav
                        uls={uls} />
                </Loader>

                <AddLeagueNav
                    setShow={setShow}
                    account_type={user.account_type} />

                <CreateLeague
                    useShow={useShow}
                    useUls={useUls} />

            </NavDropdown>
        </Nav>
    )
}

const UlsNav = props => {
    const { uls } = props

    if (uls.length > 0)
        return (
            uls.map(status => {
                const { title, pk } = status.league

                return (
                    <NavDropdown.Item
                        as={Link}
                        to={`/league/${pk}/`}
                        key={pk}>
                        {title}
                    </ NavDropdown.Item>
                )
            })
        )

    return (
        <NavDropdown.Item disabled>
            No Leagues
        </ NavDropdown.Item>
    )
}

const AddLeagueNav = props => {
    const { account_type, setShow } = props

    if (account_type === "manager")
        return (
            <NavDropdown.Item
                onClick={() => setShow(true)}
                className="text-primary">
                + Your League
            </NavDropdown.Item>
        )

    return null
}

const fetchUls = (user_pk) => [
    "api/user-league-status/",
    {
        params: {
            user: user_pk,
            request_status: "accepted",
            page_size: 100
        }
    }
]
