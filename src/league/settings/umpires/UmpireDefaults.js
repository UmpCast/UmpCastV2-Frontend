import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import { useApi, useMountEffect } from "hooks"

import Loader from "common/Display"

import SettingsContainer from "league/settings/SettingsContainer"

import SignupDefaults from "./signups/SignupDefaults"
import VisibilityLevels from "./levels/VisibilityLevels"


export default function LeagueUmpires() {

    const { pk } = useParams()

    const Api = useApi(fetchLeague)
    const [league, setLeague] = useState()

    useMountEffect(() => {
        Api.fetchLeague(pk)
            .then(res => setLeague(res.data))
    })

    return (
        <SettingsContainer league={league} active="umpires">
            <Loader dep={[league]}>
                <h3>
                    <strong>Umpire Defaults</strong>
                </h3>
                <hr className="my-3" />
                <SignupDefaults league={league} />
                <VisibilityLevels league={league} />
            </Loader>
        </SettingsContainer>
    )
}

const fetchLeague = (league_pk) => [
    "api/leagues/",
    {
        pk: league_pk
    }
]
