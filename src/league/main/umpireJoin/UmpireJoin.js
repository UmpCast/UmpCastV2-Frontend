import React, { Fragment } from 'react'
import { useParams } from "react-router-dom"

import useUser, { useApi } from "hooks"
import basicApi from "promises"

import JoinCard from "./JoinCard"
import StatusCard from "./StatusCard"

import LeagueBanner, { LeagueContainer } from "../LeagueBanner"

import { Card } from "react-bootstrap"


export default function UmpireJoin() {

    const league_pk = useParams().pk

    const myUser = useUser()
    const { user, token } = myUser[0]

    const useUls = useApi(() => basicApi("api/user-league-status/",
        {
            token: token,
            params: {
                user: user.pk,
                league: league_pk
            }
        })
    )

    const uls = useUls[0]

    const display_status = uls ? ((status) => {
        if (status) {
            return <StatusCard status={status} />
        } else {
            return <JoinCard useUls={useUls} league_pk={league_pk} />
        }
    })(uls[0].request_status) : null

    return (
        <Fragment>
            <LeagueBanner pk={league_pk} league={uls && uls[0].league} noSubNav />
            <LeagueContainer>
                <Card className="mx-5 border-secondary-dashed">
                    <Card.Body className="text-center">
                        {display_status}
                    </Card.Body>
                </Card>
            </LeagueContainer>
        </Fragment>
    )
}
