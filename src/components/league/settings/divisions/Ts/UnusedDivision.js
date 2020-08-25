import React, { useState } from 'react'

import { useApi } from "common/hooks"

import { BasicConfirm } from "common/Forms"

import { ListGroup } from "react-bootstrap"
import { SyncDivisionConseq } from "components/league/settings/Text"

export default function UnusedDivision(props) {

    const { division, useLeague } = props

    const { title, path, ts_id } = division
    const [league, setLeague] = useLeague
    const { divisions } = league

    const Api = useApi(syncDivision)
    const useShow = useState(false)

    const setShow = useShow[1]

    const onCreate = (title, ts_id) => () => {
        Api.syncDivision(title, league.pk, ts_id)
            .then(res =>
                setLeague(
                    {
                        ...league,
                        divisions: divisions.concat(res.data)
                    }
                )
            )
            .finally(() =>
                setShow(false)
            )
    }

    return (
        <ListGroup.Item
            action
            className="border-0 p-1 px-2 text-primary"
            onClick={() => setShow(true)}
            key={ts_id}>
            {title}
            <small className="float-right text-muted">
                {path}
            </small>
            <BasicConfirm
                action="Add Division"
                action_text="Confirm"
                consequences={
                    <SyncDivisionConseq
                        league={league} />
                }
                useShow={useShow}
                onConfirm={onCreate(title, ts_id)}
            />
        </ListGroup.Item>
    )
}

const syncDivision = (title, league_pk, ts_id) => [
    "api/divisions/",
    {
        data: {
            title: title,
            ts_id: ts_id,
            league: league_pk
        }
    }, "POST"
]