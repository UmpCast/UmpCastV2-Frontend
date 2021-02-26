import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import useUser, { useApi, useMountEffect } from "common/hooks"
import Loader from "common/components"

import LeagueContainer from "components/league/LeagueContainer"
import JoinCard from "./JoinCard"
import StatusCard from "./StatusCard"

import { Card } from "react-bootstrap"

export default function UmpireJoin() {

    const params = useParams()

    const league_pk = params.pk

    const Api = useApi(requests)
    const { user } = useUser()

    const useUls = useState()
    const useLeague = useState()

    const [uls, setUls] = useUls
    const [league, setLeague] = useLeague

    useMountEffect(() => {
        Api.fetchUls(user.pk, league_pk)
            .then(res => setUls(res.data.results))

        Api.fetchLeaguePublic(league_pk)
            .then(res => setLeague(res.data))
    })

    return (
        <LeagueContainer league={league} noSubNav>
            <Loader dep={[uls]}>
                <Card className="mx-5 border-secondary-dashed">
                    <Card.Body className="text-center">
                        <UlsCard
                            useUls={useUls}
                            league={league} />
                    </Card.Body>
                </Card>
            </Loader>
        </LeagueContainer>
    )
}

const UlsCard = ({ useUls, league }) => {
    const [uls] = useUls

    if (uls.length === 1) {
        return <StatusCard status={uls[0]} />
    } else {
        return <JoinCard useUls={useUls} league={league} />
    }
}

const requests = {
    fetchUls: (user_pk, league_pk) => [
        "api/user-league-status/",
        {
            params: {
                user: user_pk,
                league: league_pk,
                page_size: 1
            }
        }
    ],
    fetchLeaguePublic: (league_pk) => [
        `api/leagues/${league_pk}/public/`,
        {}
    ]
}