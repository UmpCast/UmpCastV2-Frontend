import React, { useState } from 'react'

import CastsBar from "./CastsBar"
import UmpireVisibility from "../Visibility/UmpireVisibility"

import { Badge } from "react-bootstrap"

export default function UmpireRow(props) {

    const { league } = props

    const useStatus = useState(props.status)
    
    const [status, setStatus] = useStatus

    const { user } = status
    const { first_name, last_name } = user

    const onChange = (new_status) => {
        setStatus(new_status)
    }

    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex justify-content-center">
                    <div className=" my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <h5 className="mb-0">
                                <strong>
                                    {first_name.toUpperCase()} {last_name.slice(0, 1).toUpperCase()}.
                                </strong>
                            </h5>
                        </div>
                    </div>
                    <Badge
                        className="text-white bg-info mr-auto ml-2 my-auto"
                        style={{ "backgroundColor": "#B793CF" }}>
                        <small>
                            <strong>
                                L3
                            </strong>
                        </small>
                    </Badge>
                </div>
            </td>
            <td >
                <CastsBar
                    onChange={onChange}
                    status={status}
                    type="casts" />
            </td>
            <td >
                <CastsBar
                    onChange={onChange}
                    status={status}
                    type="backups" />
            </td>
            <td className="d-flex justify-content-center border-0">
                <UmpireVisibility
                    status={{ ...status, endpoint: "user-league-status" }}
                    divisions={league.divisions}
                    onChange={onChange} />
            </td>
        </tr>
    )
}