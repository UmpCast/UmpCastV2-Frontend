import React from 'react'

import { ToolTip } from "common/components"
import { useApi } from "common/hooks"

import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SyncButton({ week_start, league, handleGames }) {

    const { pk } = league

    const Api = useApi(requests)

    const hasTsApi = league.api_key !== null

    const syncTip = hasTsApi ?
        "Sync new games from Teamsnap!" :
        "You must be synced to Teamsnap"

    const onClick = () => {
        Api.Submit(() =>
            Api.syncGames(pk)
                .then(() =>
                    handleGames(week_start)
                )
        )
    }

    return (
        <ToolTip tip={syncTip} show={400} hide={250}>
            <Button
                variant="primary rounded"
                className= "mx-2 px-2 py-1"
                style={{ right: 0}}
                onClick={onClick}
                disabled={!hasTsApi}>
                <FontAwesomeIcon icon="sync" className="mr-1 fa-sm" />
                    Sync Games
                </Button>
        </ToolTip>
    )
}

const requests = {
    syncGames: (league_pk) => [
        `api/teamsnap/${league_pk}/sync/`,
        {}
    ]
}
