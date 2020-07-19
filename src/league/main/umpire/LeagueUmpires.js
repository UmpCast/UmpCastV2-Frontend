import React from 'react'

import UmpireRow from "./UmpireRow"

import { Table, Card } from "react-bootstrap"

export default function LeagueUmpires() {
    return (
        <Card>
            <Table className="mb-0 table-borderless">
                <tr className="bg-light border-bottom text-muted">
                    <th>
                        Umpires
                </th>
                    <th>
                        Casts
                </th>
                    <th>
                        Backups
                </th>
                    <th>
                        Visibility
                </th>
                </tr>
                <UmpireRow />
                <UmpireRow />
                <UmpireRow />
            </Table>
        </Card>
    )
}
