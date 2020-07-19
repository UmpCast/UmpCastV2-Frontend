import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"

export default function PendingRow() {

    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex w-100 justify-content-between">
                    <div className="d-inline-flex">
                        <div className="d-inline-flex flex-wrap bg-primary rounded p-1 mr-2 my-auto">
                            <FontAwesomeIcon
                                className="text-white fa-1x"
                                transform={{ rotate: 30 }}
                                icon={['fas', 'baseball-ball']} />
                        </div>
                        <div className="my-auto flex-shrink-0">
                            <h5 className="mb-0"><strong>Jonathan K.</strong></h5>
                        </div>
                    </div>
                    <small className="text-muted my-auto">submitted July 6, 2020</small>
                    <div className="rounded mr-2">
                        <Button variant="outline-success rounded p-0 mr-2">
                            <FontAwesomeIcon
                                style={{ "margin": "0px 3px" }}
                                icon={['fas', 'check']} />
                        </Button>
                        <Button variant="outline-danger rounded p-0 px-1">
                            <FontAwesomeIcon
                                style={{ "margin": "0px 1px" }}
                                icon={['fas', 'times']} />
                        </Button>
                    </div>
                </div>
            </td>
        </tr>
    )
}
