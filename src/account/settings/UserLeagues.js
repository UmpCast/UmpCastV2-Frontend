import React from 'react'

import useUser, { useApi } from "hooks"
import basicApi from "promises"

import UserSettingsNav from "./UserSettingsNav"
import LeagueItem from "./LeagueItem"

import { Button, ListGroup } from "react-bootstrap"

export default function UserLeagues() {

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

    const formatted_leagues = uls && uls.map(status =>
        <LeagueItem status={status} useUls={myUls} key={status.pk}/>
    )

    return (
        <UserSettingsNav active="leagues">
            <div className="d-inline-flex justify-content-between w-100 mb-3">
                <h3><strong>Leagues</strong></h3>
                <Button variant="light" className="rounded my-auto py-1 px-2" style={{ "border": "1px solid #DFDFDF" }}>
                    <strong>+</strong> Join League
                </Button>
            </div>
            <ListGroup>
                {formatted_leagues}
            </ListGroup>
        </UserSettingsNav>
    )
}
