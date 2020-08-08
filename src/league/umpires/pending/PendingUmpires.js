import React from 'react'
import { useParams } from "react-router-dom";

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import { CustomToggle } from "tools/Display"

import SubNav from "../../SubNav"
import UmpiresNav from "../UmpiresNav"
import PendingRow from "./PendingRow"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Table, Dropdown } from "react-bootstrap"

export default function PendingUmpires() {

    const { pk } = useParams()
    const { token } = useUser()[0]

    const league = useFetch(() =>
        basicApi("api/leagues/", { pk: pk, token: token })
            .then(res => res.data)
    )[0]

    const usePending = useFetch(() =>
        basicApi("api/user-league-status/",
            {
                token: token,
                params: {
                    league: pk,
                    request_status: "pending"
                }
            }
        ).then(res => res.data)
    )
    const pending = usePending[0]

    const formatted_pending = pending ?
        pending.results.map(status => <PendingRow status={status} key={status.pk} usePending={usePending} />) : null

    return (
        <SubNav pk={pk} active="umpires" league={league}>
            <UmpiresNav pk={pk} active="pending">
                <Card>
                    <Table className="mb-0 table-borderless">
                        <thead>
                            <tr className="bg-light border-bottom text-muted">
                                <td className="float-right">
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <span className="mr-1">Sort</span>
                                            <FontAwesomeIcon className="pb-1" icon={['fas', 'sort-down']} />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {formatted_pending}
                        </tbody>
                    </Table>
                </Card>
            </UmpiresNav>
        </SubNav>
    )
}
