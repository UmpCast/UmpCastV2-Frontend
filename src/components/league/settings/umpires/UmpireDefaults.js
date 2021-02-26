import React from 'react'
import { useParams } from "react-router-dom"

import { useFetchLeague } from "common/hooks"

import Loader from "common/components"
import SettingsContainer from "components/league/settings/SettingsContainer"

import SignupDefaults from "./signups/SignupDefaults"
import VisibilityLevels from "./levels/VisibilityLevels"


export default function LeagueUmpires() {

    const { pk } = useParams()

    const useLeague = useFetchLeague(pk)

    const [league] = useLeague

    return (
        <Loader dep={league}>
            <SettingsContainer league={league} active="umpires">
                    <h3>
                        <strong>Umpire Defaults</strong>
                    </h3>
                    <hr className="my-3" />
                    <SignupDefaults league={league} />
                    <VisibilityLevels league={league} />
            </SettingsContainer>
        </Loader>
    )
}