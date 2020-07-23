import React from 'react'
import { useParams } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { SettingsHeader } from "tools/Display"

import SubNav from "../../SubNav"
import SettingsNav from "../LeagueSettingsNav"
import VisibilityLevels from "./VisibilityLevels"

import { Row, Col, Button, Form } from "react-bootstrap"

export default function LeagueUmpires() {

    const { pk } = useParams()

    const initialValues = {
        name: '',
        description: '',
        website: '',
        email: ''
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

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        console.log(values)
    }

    return (
        <SubNav pk={pk} active="settings">
            <SettingsNav pk={pk} active="umpires">
                <SettingsHeader title="Umpire Defaults" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {props => (
                        <FormikForm noValidate>
                            <Row>
                                <Col lg="6" className="pr-4">
                                    <Form.Group>
                                        <Form.Label className="w-100">
                                            <strong>Max Casts</strong>
                                            <span className="float-right mr-1">3 Games</span>
                                        </Form.Label>
                                        <Form.Control type="range" min="0" max="10" step="1" custom />
                                        <Form.Check
                                            disabled
                                            type="checkbox"
                                            label={
                                                <small className="form-text">
                                                    Update current umpires
                                            </small>
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                                <Col lg="6" className="pl-4">
                                    <Form.Group>
                                        <Form.Label className="w-100">
                                            <strong>Max Backups</strong>
                                            <span className="float-right mr-1">3 Games</span>
                                        </Form.Label>
                                        <Form.Control type="range" min="0" max="10" step="1" custom />
                                        <Form.Check
                                            type="checkbox"
                                            label={
                                                <small className="form-text">
                                                    Update current umpires
                                            </small>
                                            }
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button type="submit" className="rounded">Update</Button>
                        </FormikForm>
                    )}
                </Formik>
                <VisibilityLevels />
            </SettingsNav>
        </SubNav>
    )
}
