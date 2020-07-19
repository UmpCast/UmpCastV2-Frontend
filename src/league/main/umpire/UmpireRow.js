import React from 'react'

import { CustomToggle } from "../../../tools/Display"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Dropdown, Form, ListGroup, Badge } from "react-bootstrap"

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
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="rounded-pill bg-light text-muted py-0 debug mx-1"
                            id="dropdown-basic"
                            style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                        >
                            AAA
                    </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="primary"
                            className="rounded-pill text-light border-0 py-0 mx-1"
                            id="dropdown-basic"
                            style={{ "background-color": "#83ADE8", "lineHeight": 1.7 }}
                        >
                            PCL
                    </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2 py-0 border-0">
                            <Form>
                                <ListGroup>
                                    <ListGroup.Item className="pl-3 p-2">
                                        <Form.Check type="checkbox" label="Base"></Form.Check>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="pl-3 p-2">
                                        <Form.Check type="checkbox" label="Plate"></Form.Check>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="dark"
                            className="rounded-pill text-light border-0 py-0 mx-1"
                            id="dropdown-basic"
                            style={{ "background-color": "#7E8081", "lineHeight": 1.7 }}
                        >
                            Majors
                    </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </td>
        </tr>
    )
}