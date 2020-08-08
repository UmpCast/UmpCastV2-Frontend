import React from "react"

import {Card} from "react-bootstrap"

export default function NoGame() {
    return (
        <Card className="mb-2 mx-0 w-100" bg="light">
            <Card.Body className="p-2">
                <Card.Text className="mb-0 text-muted text-center">No games</Card.Text>
            </Card.Body>
        </Card>
    )
}
