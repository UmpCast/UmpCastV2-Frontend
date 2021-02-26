import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import { useApi, useMountEffect } from "common/hooks"

import Loader, { CustomToggle } from "common/components"

import UmpiresContainer from "components/league/umpires/UmpiresContainer"

import PendingRow from "./PendingRow"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Table, Dropdown } from "react-bootstrap"

export default function PendingUmpires() {

    const { pk } = useParams()

    const Api = useApi(requests)

    const useLeague = useState()
    const usePending = useState()

    const [league, setLeague] = useLeague
    const [pending, setPending] = usePending

    useMountEffect(() => {
        Promise.all([Api.fetchLeague(pk), Api.fetchPending(pk)])
            .then(res => {
                setLeague(res[0].data)
                setPending(res[1].data)
            })
    })

    return (
        <UmpiresContainer league={league} active="pending">
            <Loader dep={[pending]}>
                <Card>
                    <Table className="mb-0 table-borderless">
                        <thead>
                            <tr className="bg-light border-bottom text-muted">
                                <td className="float-right">
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <span className="mr-1">
                                                Sort
                                            </span>
                                            <FontAwesomeIcon
                                                className="pb-1"
                                                icon={['fas', 'sort-down']} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <ListPending usePending={usePending} />
                        </tbody>
                    </Table>
                </Card>
            </Loader>
        </UmpiresContainer>
    )
}

const ListPending = ({ usePending }) => (
    usePending[0].results.map(status =>
        <PendingRow
            status={status}
            usePending={usePending}
            key={status.pk}
        />
    )
)

const requests = {
    fetchLeague: (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ],
    fetchPending: (league_pk) => [
        "api/user-league-status/",
        {
            params: {
                league: league_pk,
                request_status: "pending"
            }
        },
        "GET"
    ]
}