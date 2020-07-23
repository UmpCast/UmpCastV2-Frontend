import React from 'react'
import { useParams } from "react-router-dom";

import { CustomToggle } from "tools/Display"

import SubNav from "../../SubNav"
import UmpiresNav from "../UmpiresNav"
import PendingRow from "./PendingRow"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Table, Dropdown } from "react-bootstrap"

export default function PendingUmpires() {

    const { pk } = useParams()

    return (
        <SubNav pk={pk} active="umpires">
            <UmpiresNav pk={pk} active="pending">
                <Card>
                    <Table className="mb-0 table-borderless">
                        <thead>
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
                        </thead>
                        <tbody>
                            <PendingRow />
                            <PendingRow />
                            <PendingRow />
                        </tbody>
                    </Table>
                </Card>
            </UmpiresNav>
        </SubNav>
    )
}
