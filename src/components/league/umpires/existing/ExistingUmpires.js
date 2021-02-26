import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import { useApi, useMountEffect } from "common/hooks"
import Loader, { PageNav } from "common/components"

import UmpiresContainer from "components/league/umpires/UmpiresContainer"

import UmpireRow from "./Umpire/UmpireRow"

import { Row, Col, Table, Card } from "react-bootstrap"

const page_size = 10

export default function ManageUmpires() {

    const { pk } = useParams()

    const Api = useApi(requests)

    const useUls = useState()
    const useLeague = useState()

    const [uls, setUls] = useUls
    const [league, setLeague] = useLeague

    useMountEffect(() => {
        Promise.all([Api.fetchLeague(pk), Api.fetchUls(pk)])
            .then(res => {
                setLeague(res[0].data)
                setUls(res[1].data)
            })
    })

    const setPage = (page) => {
        Api.fetchUls(pk, page)
            .then(res => setUls(res.data))
    }

    return (
        <UmpiresContainer league={league} active="existing">
            <Loader dep={[uls, league]}>
                <Row className="mb-3">
                    <Col>
                        <Card className="border">
                            <Table className="mb-0 border-0">
                                <TableHead />
                                <ListExisting
                                    {...{ uls, league }} />
                            </Table>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex w-100">
                        <PageNav
                            {...{ list: uls, setPage, page_size }} />
                    </Col>
                </Row>
            </Loader>
        </UmpiresContainer>
    )
}

const TableHead = () => (
    <thead>
        <tr className="bg-light text-muted border-0">
            <th className="text-center">
                Umpires
            </th>
            <th>Casts</th>
            <th>Backups</th>
            <th className="text-center">
                Visibility
            </th>
        </tr>
    </thead>
)

const ListExisting = ({ uls, league }) => {
    const existing = (
        uls.results.map(status =>
            <UmpireRow
                status={status}
                league={league}
                key={status.user.pk} />
        )
    )

    return <tbody>{existing}</tbody>
}

const requests = {
    fetchLeague: (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ],
    fetchUls: (league_pk, page) => [
        "api/user-league-status/",
        {
            params: {
                league: league_pk,
                account_type: "umpire",
                request_status: "accepted",
                page_size: page_size,
                page: page
            }
        }
    ]
}
