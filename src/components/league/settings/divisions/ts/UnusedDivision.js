import React, { useState } from 'react'

import { useApi } from "common/hooks"

import { BasicConfirm } from "common/forms"

import { ListGroup } from "react-bootstrap"
import { SyncDivisionConseq } from "components/league/settings/Text"

export default function UnusedDivision({ division, useLeague }) {

    const { title, path, ts_id } = division
    const [league, setLeague] = useLeague

    const Api = useApi(requests)
    const useShow = useState(false)

    const setShow = useShow[1]

    const onCreate = (ts_id) => () => {

        let ts_ids = league.divisions.map(div => div.ts_id)

        ts_ids.push(parseInt(ts_id))

        Api.syncDivision(league.pk, ts_ids)
            .then(res => {
                setShow(false)
                return Api.fetchLeague(league.pk)
            })
            .then(res =>
                setLeague(res.data)
            )
            .catch(() => setShow(false))
    }

    return (
        <ListGroup.Item
            action
            className="d-inline-flex justify-content-between text-primary border-0 p-1 px-2 "
            onClick={() => setShow(true)}
            key={ts_id}>
            {title}
            <small className="d-inline-block text-truncate text-muted float-right ml-3 my-auto">
                {path}
            </small>
            <BasicConfirm
                action="Add Division"
                action_text="Confirm"
                consequences={
                    <SyncDivisionConseq
                        division={division}
                        league={league} />
                }
                useShow={useShow}
                onConfirm={onCreate(ts_id)}
            />
        </ListGroup.Item>
    )
}

const requests = {
    fetchLeague: (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ],
    syncDivision: (league_pk, ts_ids) => [
        `api/teamsnap/${league_pk}/build/`,
        {
            data: {
                divisions: ts_ids
            }
        }, "POST"
    ]
}