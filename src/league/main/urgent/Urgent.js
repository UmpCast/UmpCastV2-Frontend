import React from 'react'

import UrgentGame from "./UrgentGame"

import { Container, Row, Col } from "react-bootstrap"

export default function UrgentGames() {
    return (
        <Container>
            <Row>
                <Col>
                    <UrgentGame/>
                </Col>
            </Row>
        </Container >
    )
}
