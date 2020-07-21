import React from 'react'

import FullGame from "./Game"

import { Container, Pagination, Card, ListGroup, Dropdown } from "react-bootstrap"

export default function SearchTable() {
    return (
        <Container>
            <div className="d-inline-flex justify-content-between my-3 w-100">
                <Pagination size="sm" className="d-none d-xl-block my-auto">
                    <Pagination.Item active>
                        <div className="my-1">Palo Alto Little League</div>
                    </Pagination.Item>
                </Pagination>
                <div className="my-auto d-inline-flex">
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="rounded-pill bg-light text-muted py-1 debug mx-1"
                            id="dropdown-basic"
                            style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                        >
                            All Days
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="rounded-pill bg-light text-muted py-1 debug mx-1"
                            id="dropdown-basic"
                            style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                        >
                            All Dates
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="rounded-pill bg-light text-muted py-1 debug mx-1"
                            id="dropdown-basic"
                            style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                        >
                            All Divisions
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="light"
                            className="rounded-pill bg-light text-muted py-1 debug mx-1"
                            id="dropdown-basic"
                            style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
                        >
                            Sort by date
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="mt-2">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Card className="border-0">
                <Card.Header className="border">
                    <strong>20</strong> games from all divisions
                </Card.Header>
                <Card.Body className="p-0">
                    <ListGroup.Item className="border-top-0 pl-0" action>
                        <div className="d-inline-flex w-100">
                            <div className="d-inline-flex flex-column my-auto mb-0 px-4 text-center border-right">
                                <strong>Aug</strong>
                                <div className="mb-0 text-primary" style={{ "fontSize": 30, "lineHeight": 1 }}>
                                    <strong>10</strong>
                                </div>
                                <div className="text-muted">Mon</div>
                            </div>
                            <div className="w-100 ml-3">
                                <FullGame
                                    time_start="3:30 PM"
                                    time_end="5:30 PM"
                                    title={<strong className="text-primary">Morgan-Gault vs. Agile</strong>}
                                    division="Majors"
                                    location="Mitchell Ballpark"
                                    cast={cast} />
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-top-0 pl-0" action>
                        <div className="d-inline-flex w-100">
                            <div className="d-inline-flex flex-column my-auto mb-0 px-4 text-center border-right">
                                <strong>Aug</strong>
                                <div className="mb-0 text-primary" style={{ "fontSize": 30, "lineHeight": 1 }}>
                                    <strong>10</strong>
                                </div>
                                <div className="text-muted">Mon</div>
                            </div>
                            <div className="w-100 ml-3">
                                <FullGame
                                    time_start="3:30 PM"
                                    time_end="5:30 PM"
                                    title={<strong className="text-primary">Morgan-Gault vs. Agile</strong>}
                                    division="Majors"
                                    location="Mitchell Ballpark"
                                    cast={cast} />
                            </div>
                        </div>
                    </ListGroup.Item>
                </Card.Body>
            </Card>

        </Container>
    )
}

const cast = [
    {
        role: "Base",
        first_name: null,
        last_name: null
    },
    {
        role: "Plate",
        first_name: null,
        last_name: null
    },
    {
        role: "Scorekeeper",
        first_name: null,
        last_name: null
    }
]