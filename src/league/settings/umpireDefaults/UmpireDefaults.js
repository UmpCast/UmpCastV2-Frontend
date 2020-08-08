import React, { Fragment } from 'react'
import { useParams } from "react-router-dom"

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import SubNav from "../../SubNav"
import SettingsNav from "../LeagueSettingsNav"

import CastingDefaults from "./CastingDefaults"
import VisibilityLevels from "./VisibilityLevels"


export default function LeagueUmpires() {

    const { pk } = useParams()
    const { token } = useUser()[0]
    const league = useFetch(() =>
        basicApi("api/leagues/", { pk: pk, token: token })
            .then(res => res.data)
    )[0]

    return (
        <SubNav pk={pk} active="settings" league={league}>
            <SettingsNav pk={pk} active="umpires">
                <h3><strong>Umpire Defaults</strong></h3>
                <hr className="my-3" />
                {league ?
                    <Fragment>
                        <CastingDefaults league={league} />
                        <VisibilityLevels league={league} />
                    </Fragment>
                    : null}
            </SettingsNav>
        </SubNav>
    )
}
