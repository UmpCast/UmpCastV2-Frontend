import React from 'react'

import SearchGame from "./SearchGame"
import SearchFilter from "./SearchFilter"

import { Container, Pagination, Card, ListGroup } from "react-bootstrap"

export default function SearchTable() {
    return (
        <Container>
            <div className="d-inline-flex justify-content-between my-3 w-100">
                <Pagination size="sm" className="d-none d-xl-block my-auto">
                    <Pagination.Item active>
                        <div className="my-1">Palo Alto Little League</div>
                    </Pagination.Item>
                </Pagination>
                <SearchFilter />
            </div>

            <Card className="border-0">
                <Card.Header className="border">
                    <strong>20</strong> games from all divisions
                </Card.Header>
                <Card.Body className="p-0">
                    <ListGroup.Item className="border-top-0 pl-0" action>
                        <SearchGame
                            time_start="3:30 PM"
                            time_end="5:30 PM"
                            title={<strong className="text-primary">Morgan-Gault vs. Agile</strong>}
                            division="Majors"
                            location="Mitchell Ballpark"
                            cast={cast} />
                    </ListGroup.Item>
                    <ListGroup.Item className="border-top-0 pl-0" action>
                        <SearchGame
                            time_start="3:30 PM"
                            time_end="5:30 PM"
                            title={<strong className="text-primary">Morgan-Gault vs. Agile</strong>}
                            division="Majors"
                            location="Mitchell Ballpark"
                            cast={cast} />
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