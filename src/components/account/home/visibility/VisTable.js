import React from 'react'

import Loader from "common/components"

import { Table } from "react-bootstrap"

export default function VisTable({ status }) {

    const { league, visibilities } = status

    const list_divisions = league.divisions.map(division =>
        <DivisionRow
            division={division}
            vis={visibilities}
            key={division.pk} />
    )

    return (
        <Table className="table-borderless m-0">
            <tbody>
                {list_divisions}
            </tbody>
        </Table>
    )
}

const DivisionRow = ({ division, vis }) => {
    const { roles } = division
    const list_rows = roles.map(role =>
        <span className={`${!vis.includes(role.pk) && "text-muted"} mx-2`} key={role.pk}>
            {role.title}
        </span>
    )
    return (
        <tr>
            <td
                className="p-0 pb-3 px-2 flex-shrink-0"
                style={{ width: 1, whiteSpace: "noWrap" }}>
                {division.title}
            </td>
            <td className="p-0 pl-3 text-primary d-flex flex-wrap">
                {list_rows}
                <Loader dep={roles.length === 0}>
                    <span className="text-muted mx-2 border rounded px-2">
                        no roles
                    </span>
                </Loader>
            </td>
        </tr>
    )
}