import React from 'react'

import UsedDivision from "./UsedDivison"
import UnusedDivision from "./UnusedDivision"

import { Card } from "react-bootstrap"

export default function TsDivisions(props) {

    const { useLeague } = props

    const [league] = useLeague
    const { ts_divisions } = league

    return (
        <Card className="mt-4 border-0 rounded">
            <Card.Header
                className="p-2 pr-3 border rounded-top bg-light text-secondary">
                Select Teamsnap Divisions
            </Card.Header>
            <Card.Body
                className="border p-0 rounded-bottom">
                <ListDivisions
                    ts_divisions={ts_divisions}
                    useLeague={useLeague} />
            </Card.Body>
        </Card>
    )
}

const ListDivisions = ({ ts_divisions, useLeague }) => (
    ts_divisions.map(division =>
        division.pk ?
            <UsedDivision
                useLeague={useLeague}
                division={division}
                key={division.ts_id} />
            :
            <UnusedDivision
                useLeague={useLeague}
                division={division}
                key={division.ts_id} />
    )
)