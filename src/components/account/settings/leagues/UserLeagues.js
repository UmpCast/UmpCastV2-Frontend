import React, { useState } from 'react'

import useUser, { useApi, useMountEffect } from "common/hooks"
import Loader from "common/components"

import UserSettingsContainer from "../SettingsContainer"
import LeagueSearch from "./LeagueSearch"
import LeagueRow from "./LeagueRow"

import { ListGroup, Button } from "react-bootstrap"

export default function UserLeagues() {

    const Api = useApi(requests)
    const { user } = useUser()

    const useUls = useState()
    const useShow = useState(false)

    const [uls, setUls] = useUls
    const [, setShow] = useShow

    useMountEffect(() => {
        Api.fetchUls(user)
            .then(res => setUls(res.data.results))
    })

    return (
        <UserSettingsContainer active="leagues">
            <div className="d-inline-flex justify-content-between w-100 mb-3">
                <h3 className="font-weight-strong">
                    Leagues
                </h3>
                <Button
                    variant="light"
                    className="rounded my-auto py-1 px-2"
                    style={{ "border": "1px solid #DFDFDF" }}
                    onClick={() => setShow(true)}>
                    <strong>+</strong> Join League
                </Button>
                <LeagueSearch useShow={useShow} />
            </div>
            <Loader dep={[uls]}>
                <ListGroup>
                    <ListLeagues
                        {...{ useUls }} />
                </ListGroup>
            </Loader>
        </UserSettingsContainer>
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

const requests = {
    fetchUls: (user) => [
        "api/user-league-status/",
        {
            params: {
                user: user.pk,
                request_status: "accepted",
                page_size: 100
            }
        }
    ]
}
