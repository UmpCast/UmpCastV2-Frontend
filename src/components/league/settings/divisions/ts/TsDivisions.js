import React, { useState } from 'react'

import Loader from "common/components"

import TsHeader from "./TsHeader"
import UsedDivision from "./UsedDivison"
import UnusedDivision from "./UnusedDivision"

import { Accordion, Card } from "react-bootstrap"

export default function TsDivisions({ useLeague }) {

    const useTsDivs = useState()

    const [tsDivs] = useTsDivs

    return (
        <Accordion defaultActiveKey={null}>
            <Card>
                <TsHeader
                    useLeague={useLeague}
                    useTsDivs={useTsDivs}
                    eventKey="0"/>
                <Accordion.Collapse eventKey="0">
                    <Loader dep={tsDivs}>
                        <ListTsDivs
                            tsDivs={tsDivs}
                            useLeague={useLeague} />
                    </Loader>
                </Accordion.Collapse>
            </Card>
        </Accordion>
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