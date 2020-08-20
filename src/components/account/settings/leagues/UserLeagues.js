import React, { useState } from 'react'

import useUser, { useApi, useMountEffect } from "global/hooks"

import Loader from "common/Components"

import UserSettingsNav from "../UserSettingsNav"
import LeagueRow from "./LeagueRow"

import { Button, ListGroup } from "react-bootstrap"

export default function UserLeagues() {

    const Api = useApi(fetchUls)
    const { user } = useUser()

    const useUls = useState()

    const [uls, setUls] = useUls

    useMountEffect(() => {
        Api.fetchUls(user)
            .then(res => setUls(res.data.results))
    })

    return (
        <UserSettingsNav active="leagues">
            <div className="d-inline-flex justify-content-between w-100 mb-3">
                <h3 className="font-weight-strong">
                    Leagues
                </h3>
                <Button
                    variant="light"
                    className="rounded my-auto py-1 px-2"
                    style={{ "border": "1px solid #DFDFDF" }}>
                    <strong>+</strong> Join League
                </Button>
            </div>
            <Loader dep={[uls]}>
            <ListGroup>
                <ListLeagues
                    {...{ useUls }} />
                    </ListGroup>
            </Loader>
        </UserSettingsNav>
    )
}

const ListLeagues = ({ useUls }) => (
    useUls[0].map(status =>
        <LeagueRow
            status={status}
            useUls={useUls}
            key={status.pk} />
    )
)

const fetchUls = (user) => [
    "api/user-league-status/",
    {
        params: {
            user: user.pk,
            request_status: "accepted",
            page_size: 100
        }
    }
]
