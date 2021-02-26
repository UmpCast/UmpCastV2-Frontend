import React, { useState } from 'react'
import { Link } from "react-router-dom"

import useUser, { useApi, useMountEffect } from "common/hooks"

import Loader from "common/components"
import CreateLeague from "./CreateLeague"

import { Nav, NavDropdown } from "react-bootstrap"

export default function LeagueLinks({ setExpanded }) {

    const Api = useApi(requests)
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
            <Nav.Link
                as={Link}
                to="/"
                onClick={() => setExpanded(false)}>
                Dashboard
            </Nav.Link>
            <Loader dep={user.accepted_leagues.length > 0}>
                <Nav.Link
                    as={Link}
                    to="/game/search"
                    onClick={() => setExpanded(false)}>
                    Games
                </Nav.Link>
            </Loader>
            <NavDropdown title="Leagues">

                <Loader dep={uls}>
                    <UlsNav
                        uls={uls}
                        setExpanded={setExpanded}/>
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

const UlsNav = ({uls, setExpanded}) => {
    if (uls.length > 0)
        return (
            uls.map(status => {
                const { title, pk } = status.league

                return (
                    <NavDropdown.Item
                        as={Link}
                        to={`/league/${pk}/`}
                        onClick={()=>setExpanded(false)}
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

const requests = {
    fetchUls: (user_pk) => [
        "api/user-league-status/",
        {
            params: {
                user: user_pk,
                request_status: "accepted",
                page_size: 100
            }
        }
    ]
}
