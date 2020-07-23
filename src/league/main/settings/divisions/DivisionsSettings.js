import React, { useContext } from 'react'
import { useParams } from "react-router-dom";

import UserContext from "UserContext"
import { SettingsHeader } from "tools/Display"
import { useLeague } from "../../../hooks"

import SubNav from "../../SubNav"
import SettingsNav from "../LeagueSettingsNav"
import DivisionCard from "./DivisionCard"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Card, ListGroup, Button, Accordion } from "react-bootstrap"

export default function Divisions() {

    const { pk } = useParams()

    const { token } = useContext(UserContext)[0]

    const [myLeague, ] = useLeague(pk, token)

    let formatted_divisions = null;

    if (myLeague) {
        formatted_divisions = myLeague.divisions.map(division =>
            <DivisionCard
                key={division.pk}
                pk={division.pk}
                title={division.title}
                roles={division.roles}
            />
        )
    }

    return (
        <SubNav pk={pk} active="settings">
            <SettingsNav pk={pk} active="divisions">
                <SettingsHeader title="League Divisions" />
                <Row>
                    <Col xs={6}>
                        <h5 className=""><strong>Sync Divisions & Games</strong></h5>
                        <Button variant="danger rounded my-2"><strong>Unsync</strong></Button>
                        <small className="form-text text-muted">
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
                                    <FontAwesomeIcon icon={'trash'} className="mr-2 fa-sm my-auto" />
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
                        {formatted_divisions}
                    </Col>
                </Row>
            </SettingsNav>
        </SubNav>
    )
}

const divisions = [
    {
        division: "AAA",
        roles: [
            {
                role: "Base",
                num_umpires: 5
            },
            {
                role: "Plate",
                num_umpires: 7
            },
            {
                role: "ScoreKeeper",
                num_umpires: 3
            }
        ]
    },
    {
        division: "PCL",
        roles: [
            {
                role: "Base",
                num_umpires: 0
            },
        ]
    }
]
