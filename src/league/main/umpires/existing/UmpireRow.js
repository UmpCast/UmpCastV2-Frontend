import React from 'react'

import SetMax from "./SetMax"
import UmpireVisibility from "./UmpireVisibility"

import { Badge } from "react-bootstrap"

export default function UmpireRow(props) {

    const { league, status, onChange } = props
    const { user, max_casts } = status
    const { first_name, last_name } = user

    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex justify-content-center">
                    <div className=" my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <h5 className="mb-0"><strong>{first_name.toUpperCase()} {last_name.slice(0, 1).toUpperCase()}.</strong></h5>
                        </div>
                    </div>
                    <Badge className="text-white bg-info mr-auto ml-2 my-auto" style={{ "backgroundColor": "#B793CF" }}><small><strong>L3</strong></small></Badge>
                </div>
            </td>
            <td className="align-middle">
                <SetMax max_casts={max_casts} casted={0} />
            </td>
            <td className="align-middle">
                <SetMax max_casts={max_casts} casted={0} />
            </td>
            <td className="d-flex justify-content-center border-0">
                <UmpireVisibility divisions={league.divisions} onChange={onChange} status={{...status, endpoint: "user-league-status"}} />
            </td>
        </tr>
    )
}