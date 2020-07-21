import React from 'react'

import { CustomToggle } from "../../../tools/Display"

import UmpireVisibility from "./DivisionVisibility"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dropdown, Form, Badge } from "react-bootstrap"

export default function UmpireRow() {
    return (
        <tr className="border-top">
            <td>
                <div className="d-inline-flex justify-content-center">
                    <div className=" my-auto d-flex flex-column">
                        <div className="my-auto flex-shrink-0">
                            <h5 className="mb-0"><strong>Jonathan K.</strong></h5>
                        </div>
                    </div>
                    <Badge className="text-white bg-info mr-auto ml-2 my-auto" style={{"background-color": "#B793CF"}}><small><strong>L3</strong></small></Badge>
                </div>
            </td>
            <td className="align-middle">
                <div className="d-flex flex-column"></div>
                <div className="text-center">
                    <FontAwesomeIcon className="text-primary mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-primary mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-primary mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                </div>
            </td>
            <td className="align-middle">
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <div className="text-center">
                            <FontAwesomeIcon className="text-success mr-1" icon={['fas', 'square']} />
                            <FontAwesomeIcon className="text-success mr-1" icon={['fas', 'square']} />
                            <FontAwesomeIcon className="text-success mr-1" icon={['fas', 'square']} />
                            <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                            <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="mt-2 py-0 px-2" style={{ "width": "250px" }}>
                        <Form.Group className="my-0 text-center">
                            <small className="text-muted">Max 6</small>
                            <Form.Control type="range" min="0" max="10" step="1" custom />
                        </Form.Group>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
            <td className="align-middle">
                <div className="justify-content-between d-flex">
                    <UmpireVisibility />
                </div>
            </td>
        </tr>
    )
}