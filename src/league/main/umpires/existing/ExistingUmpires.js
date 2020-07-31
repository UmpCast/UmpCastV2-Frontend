import React from 'react'
import { useParams } from "react-router-dom"

import useUser, { useApi } from "hooks"
import basicApi from "promises"


import SubNav from "../../SubNav"
import UmpiresNav from "../UmpiresNav"
import UmpireRow from "./UmpireRow"

import { Table, Card } from "react-bootstrap"

export default function ManageUmpires() {

    const { pk } = useParams()
    const { token } = useUser()[0]

    const league= useApi(() => basicApi("api/leagues/", { pk: pk, token: token }))[0]

    const [uls, setUls] = useApi(() => basicApi("api/user-league-status/",
        {
            token: token,
            params: { league: pk, request_status: "accepted" }
        }))
    
    const onChange = (new_status) => {
        setUls(uls.map(status => status.pk === new_status.pk ? new_status : status))
    }
    
    const formatted_umpires = uls && league ? 
    uls.map(status => < UmpireRow league={league} status={status} onChange={onChange} key={status.user.pk}/>) : null

    return (
        <SubNav pk={pk} active="umpires" league={league}>
            <UmpiresNav pk={pk} active="existing">
                <Card>
                    <Table className="mb-0 table-borderless">
                        <thead>
                            <tr className="bg-light border-bottom text-muted text-center">
                                <th>Umpires</th>
                                <th>Casts</th>
                                <th>Backups</th>
                                <th>Visibility</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formatted_umpires}
                        </tbody>
                    </Table>
                </Card>
            </UmpiresNav>
        </SubNav>
    )
}
