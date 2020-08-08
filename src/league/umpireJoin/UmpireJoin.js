import React, { Fragment } from 'react'
import { useParams } from "react-router-dom"

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import JoinCard from "./JoinCard"
import StatusCard from "./StatusCard"

import LeagueBanner, { LeagueContainer } from "../LeagueBanner"

import { Card } from "react-bootstrap"


export default function UmpireJoin() {

    const league_pk = useParams().pk

    const myUser = useUser()
    const { user, token } = myUser[0]

    const useUls = useFetch(() => basicApi("api/user-league-status/",
        {
            token: token,
            params: {
                user: user.pk,
                league: league_pk,
                page_size: 1
            }
        })
    )

    const uls = useUls[0]

    const display_status = uls ? ((uls) => {
        if (uls.count === 1) {
            return <StatusCard status={uls.results[0]} />
        } else {
            return <JoinCard useUls={useUls} league_pk={league_pk} />
        }
    })(uls) : null

    return (
        <Fragment>
            {/* <LeagueBanner pk={league_pk} league={uls && uls.results[0].league} noSubNav /> */}
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
