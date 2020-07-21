import React from 'react'

import SearchGame from "../../../game/search/SearchGame"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap"

export default function UrgentGame() {
    return (
        <Card>
            <Card.Header>
                <span className="text-danger">
                    <FontAwesomeIcon icon={['fas', 'fire']} className="mr-2" />2 days left
                </span>
                <span className="float-right text-muted">
                    <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
                    <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
                    <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
                </span>
            </Card.Header>
            <Card.Body className="pl-0">
                <SearchGame
                    date="Aug 10"
                    time_start="3:30 PM"
                    time_end="5:30 PM"
                    title="Morgan-Gault vs. Agile"
                    division="Majors"
                    location="Mitchell Ballpark"
                    cast={cast} />
            </Card.Body>
        </Card>
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
