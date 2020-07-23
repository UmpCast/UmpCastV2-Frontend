import React from 'react'
import {useParams} from "react-router-dom"

import SubNav from "../../SubNav"
import UmpiresNav from "../UmpiresNav"
import UmpireRow from "./UmpireRow"

import { Table, Card } from "react-bootstrap"

export default function ManageUmpires() {

    const {pk} = useParams()

    return (
        <SubNav pk={pk} active="umpires">
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
                            <UmpireRow />
                            <UmpireRow />
                            <UmpireRow />
                        </tbody>
                    </Table>
                </Card>
            </UmpiresNav>
        </SubNav>
    )
}
