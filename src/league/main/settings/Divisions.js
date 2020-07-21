import React from 'react'

import { SettingsHeader } from "../../../tools/Display"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Card, ListGroup, Badge, Button, Accordion } from "react-bootstrap"

export default function Divisions() {
    return (
        <div>
            <SettingsHeader title="League Divisions" />
            <Row>
                <Col xs={6}>
                    <h5 className=""><strong>Sync Divisions & Games</strong></h5>
                    <Button variant="danger rounded my-2"><strong>Unsync</strong></Button>
                    <small class="form-text text-muted">
                        Umpcast will be able to transfer all existing divisions and games
                        from your account, while keeping up-to-date with any changes
                    </small>
                    <Accordion>
                        <Card className="mt-4 border-0 rounded">
                            <Card.Header className="p-2 pr-3 border rounded-top bg-light text-secondary">
                                Select Teamsnap Divisions
                            </Card.Header>
                            <Card.Body className="border p-0 rounded-bottom">
                                <ListGroup.Item action className="border-0 p-1 pr-3 pl-2 text-primary action">
                                    AAA
                                    <small className="float-right text-muted">Spring 2020 / Spring 2020 / </small>
                                </ListGroup.Item>
                                <ListGroup.Item action className="border-0 p-1 pr-2 pl-2 text-white bg-primary action d-flex justify-content-between">
                                    PCL
                                    <FontAwesomeIcon icon={'trash'} className="mr-2 fa-sm my-auto"/>
                                </ListGroup.Item>
                                <ListGroup.Item action className="border-0 p-1 pr-3 pl-2 text-primary action">
                                    Majors
                                    <small className="float-right text-muted">Spring 2020 / Spring 2020 / </small>
                                </ListGroup.Item>
                            </Card.Body>
                        </Card>
                    </Accordion>
                </Col>
                <Col xs={6}>
                    <Card className="border mb-3">
                        <Card.Header className="p-1 text-center">
                            AAA
                        </Card.Header>
                        <Card.Body className="p-0 rounded-bottom">
                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                <div>
                                    <Badge variant="primary my-auto mr-3">
                                        5<FontAwesomeIcon icon={'fas', 'user'} className="ml-1" />
                                    </Badge>
                                    Base
                                </div>
                                <FontAwesomeIcon icon={'fas', 'times'} className="my-auto text-muted" />
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                <div>
                                    <Badge variant="primary my-auto mr-3">
                                        7<FontAwesomeIcon icon={'fas', 'user'} className="ml-1" />
                                    </Badge>
                                    Plate
                                </div>
                                <FontAwesomeIcon icon={'times'} className="my-auto text-muted" />
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                <div>
                                    <Badge variant="primary my-auto mr-3">
                                        7<FontAwesomeIcon icon={'fas', 'user'} className="ml-1" />
                                    </Badge>
                                    ScoreKeeper
                                </div>
                                <FontAwesomeIcon icon={'times'} className="my-auto text-muted" />
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 text-center pt-2 mt-auto">
                                <FontAwesomeIcon icon={['far', 'plus-square']} className="my-auto fa-lg text-success" />
                            </ListGroup.Item>
                        </Card.Body>
                    </Card>
                    <Card className="border">
                        <Card.Header className="p-1 text-center">
                            PCL
                        </Card.Header>
                        <Card.Body className="p-0 rounded-bottom d-flex flex-column">
                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                <div>
                                    <Badge variant="primary my-auto mr-3">
                                        5<FontAwesomeIcon icon={'fas', 'user'} className="ml-1" />
                                    </Badge>
                                    Base
                                </div>
                                <FontAwesomeIcon icon={'fas', 'times'} className="my-auto text-muted" />
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 text-center pt-0">
                                <FontAwesomeIcon icon={['far', 'plus-square']} className="my-auto fa-lg text-success" />
                            </ListGroup.Item>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
