import React from 'react'

import { CustomToggle } from "../../../tools/Display"

import PendingRow from "./PendingRow"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Table, Dropdown } from "react-bootstrap"

export default function PendingUmpires() {
    return (
        <Card>
            <Table className="mb-0 table-borderless">
                <tr className="bg-light border-bottom text-muted">
                    <td className="float-right">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle}>
                                <span className="mr-1">Sort</span>
                                <FontAwesomeIcon className="pb-1" icon={['fas', 'sort-down']} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
                <PendingRow />
                <PendingRow />
                <PendingRow />
            </Table>
        </Card>
    )
}
