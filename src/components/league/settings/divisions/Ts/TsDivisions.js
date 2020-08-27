import React from 'react'

import UsedDivision from "./UsedDivison"
import UnusedDivision from "./UnusedDivision"

import { Card } from "react-bootstrap"

export default function TsDivisions({ tsDivs, useLeague }) {
    return (
        <Card className="mt-4 border-0 rounded">
            <Card.Header
                className="p-2 pr-3 border rounded-top bg-light text-secondary">
                Select Teamsnap Divisions
            </Card.Header>
            <Card.Body className="border p-0 rounded-bottom">
                <ListTsDivs
                    tsDivs={tsDivs}
                    useLeague={useLeague} />
            </Card.Body>
        </Card>
    )
}

const ListTsDivs = ({ tsDivs, useLeague }) => {

    const [league] = useLeague
    const { divisions } = league

    const tsPaths = getTsPaths(tsDivs)

    const { mappings, tree } = tsDivs
    const tsLeafs = Object.keys(mappings).filter(
        ts_id => !(ts_id in tree)
    )

    return (
        tsLeafs.map(ts_id => {

            const leagueDiv = divisions.find(div =>
                div.ts_id === parseInt(ts_id)
            )

            if (leagueDiv) {
                return (
                    <UsedDivision
                        useLeague={useLeague}
                        division={leagueDiv}
                        key={ts_id} />
                )
            } else {
                const division = {
                    title: mappings[ts_id],
                    path: tsPaths[ts_id],
                    ts_id: ts_id
                }

                return (
                    <UnusedDivision
                        useLeague={useLeague}
                        division={division}
                        key={ts_id} />
                )
            }

        })
    )
}

const getTsPaths = (tsDivs) => {
    const { root } = tsDivs

    return recursePaths(root, "", tsDivs)
}

const recursePaths = (ts_id, path, tsDivs) => {
    const { mappings, root, tree } = tsDivs

    let paths = { [ts_id]: path }

    path += ts_id === root ? "" : mappings[ts_id] + "/"

    if (tree[ts_id])
        for (const child of tree[ts_id]) {
            paths = {
                ...paths,
                ...recursePaths(child, path, tsDivs)
            }
        }

    return paths
}
