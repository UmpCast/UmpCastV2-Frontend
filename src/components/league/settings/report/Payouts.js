import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi, useMountEffect } from "common/hooks"

import SubNav from "../../LeagueContainer"
import SettingsNav from "../SettingsContainer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, ListGroup, Row, Col, Button, InputGroup, Form } from "react-bootstrap"
import { DateRange } from 'react-date-range';

export default function Payouts() {

    const { pk } = useParams()
    const Api = useApi(requests)

    const [league, setLeague] = useState()

    useMountEffect(() => {
        Api.fetchLeague(pk)
            .then(res =>
                setLeague(res.data)
            )
    })

    const onSubmit = () => {

    }

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const handleSelect = ranges => {
        console.log(ranges);
    }

    const initialValues = {

    }

    const validationSchema =
        Yup.object({
            name: Yup.string()
                .max(20, "Maximum of 20 characters"),
            description: Yup.string()
                .max(75, "Maximum of 75 characters"),
            website: Yup.string()
                .max(30, "Maximum of 30 characters"),
            email: Yup.string()
                .max(30, "Maximum of 30 characters")
                .email("Must be a valid email")
        })

    return (
        <SubNav pk={pk} active="settings" league={league}>
            <SettingsNav pk={pk} active="payouts">
                <div className="d-inline-flex justify-content-between w-100">
                    <h3><strong>Payout Report</strong></h3>
                    <div>
                        <Button variant="outline-danger rounded my-auto mr-2" disabled>
                            <FontAwesomeIcon icon={'file-pdf'} className="mr-2" />PDF
                    </Button>
                        <Button variant="outline-primary rounded my-auto mr-2" disabled>
                            <FontAwesomeIcon icon={['fab', 'google']} className="mr-2" />Sheets
                    </Button>
                        <Button variant="outline-success rounded my-auto mr-2" disabled>
                            <FontAwesomeIcon icon={'file-excel'} className="mr-2" />Excel
                    </Button>
                        <Button variant="outline-info rounded my-auto" disabled>
                            <FontAwesomeIcon icon={'file-csv'} className="mr-2" />CSV
                    </Button>
                    </div>
                </div>
                <hr className="mb-4 mt-2" />
                <Row>
                    <Col>
                        <div className="ml-3">
                            <h5 className="mb-0"><strong>1. Set Date Range</strong></h5>
                            <small className="text-muted">
                                Only games in the date range you specify will be included in the report
                            </small>
                            <div className="mt-3 ml-1">
                                <DateRange
                                    ranges={[selectionRange]}
                                    onChange={handleSelect}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col style={{ "opacity": .5 }}>
                        <h5 className="mb-0"><strong>2. Provide Payment Levels</strong></h5>
                        <small className="text-muted form-text">
                            We know leagues sometimes payout differently for different divisions or roles.
                            Here, you can provide how much each position is payed per game
                    </small>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {props => (
                                <FormikForm noValidate>
                                    <Card className="border my-3">
                                        <Card.Header className="p-1 text-center">
                                            AAA
                                </Card.Header>
                                        <Card.Body className="p-1 rounded-bottom">
                                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                                Base
                                        <InputGroup style={{ "width": "125px" }} size="sm">
                                                    <InputGroup.Prepend className="rounded-left">
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control type="number" disabled />
                                                    <InputGroup.Append className="rounded-left">
                                                        <InputGroup.Text>.00</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                                Plate
                                        <InputGroup style={{ "width": "125px" }} size="sm">
                                                    <InputGroup.Prepend className="rounded-left">
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control type="number" />
                                                    <InputGroup.Append className="rounded-left">
                                                        <InputGroup.Text>.00</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
                                                Scorekeeper
                                        <InputGroup style={{ "width": "125px" }} size="sm">
                                                    <InputGroup.Prepend className="rounded-left">
                                                        <InputGroup.Text>$</InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Form.Control type="number" />
                                                    <InputGroup.Append className="rounded-left">
                                                        <InputGroup.Text>.00</InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </ListGroup.Item>
                                        </Card.Body>
                                    </Card>
                                </FormikForm>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </SettingsNav>
        </SubNav>
    )
}

const requests = {
    fetchLeague: (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ]
}
