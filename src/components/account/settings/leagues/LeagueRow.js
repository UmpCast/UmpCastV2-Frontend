import React from 'react'
import { Link } from "react-router-dom"

import { useApi } from "common/hooks"

import { Button, ListGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function LeagueRow(props) {

    const { status, useUls } = props

    const { pk, league } = status
    const [uls, setUls] = useUls

    const Api = useApi(deleteUls)

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
        <ListGroup.Item className="p-3 pt-4">
            <div className="d-inline-flex justify-content-between w-100">
                <div className="d-flex align-middle">
                    <FontAwesomeIcon
                        icon={["fas", "meteor"]}
                        className="fa-lg rounded text-white bg-dark p-1 mr-3" />
                    <Link
                        to={`/league/${pk}`}
                        className="font-weight-strong">
                        {league.title}
                    </Link>
                </div>
                <Button
                    variant="light rounded py-0 my-auto"
                    style={{ "border": "1px solid #E2E4E8" }}
                    onClick={onSubmit}>
                    Leave
                </Button>
            </div>
        </ListGroup.Item>
    )
}

const deleteUls = (status) => [
    "api/user-league-status/",
    {
        pk: status.pk
    },
    "DELETE"
]