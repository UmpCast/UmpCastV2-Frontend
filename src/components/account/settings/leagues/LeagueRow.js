import React from 'react'

import { useApi } from "common/hooks"

import LeagueItem from "./LeagueItem"

import { Button } from "react-bootstrap"

export default function LeagueRow(props) {

    const { status, useUls } = props

    const { league } = status
    const [uls, setUls] = useUls

    const Api = useApi(requests)

    const onSubmit = () => {
        Api.Submit(() =>
            Api.deleteUls(status)
        ).then(() => {
            const new_uls = uls.filter(
                _status => _status.pk !== status.pk
            )
            setUls(new_uls)
        })
    }

    return (
        <LeagueItem league={league}>
            <Button
                variant="light rounded py-0 my-auto"
                style={{ border: "1px solid #E2E4E8" }}
                onClick={onSubmit}>
                Leave
            </Button>
        </LeagueItem >
    )
}

const requests = {
    deleteUls: (status) => [
        "api/user-league-status/",
        {
            pk: status.pk
        },
        "DELETE"
    ]
}