import React from 'react'
import { useParams } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { TextInput } from "tools/Input"
import { SettingsHeader } from "tools/Display"

import SubNav from "../SubNav"
import SettingsNav from "./LeagueSettingsNav"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap"

export default function LeagueProfile() {

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
            <SettingsNav pk={pk} active="profile">
                <SettingsHeader title="League Profile" />
                <Row>
                    <Col lg="8" className="pr-5">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {props => (
                                <FormikForm noValidate>
                                    <TextInput
                                        label="League Display Name"
                                        name="name"
                                        type="text"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Description"
                                        name="description"
                                        type="text"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Website"
                                        name="website"
                                        type="text"
                                        className="rounded"
                                    />
                                    <Button type="submit" className="rounded">Update Profile</Button>
                                </FormikForm>
                            )}
                        </Formik>
                    </Col>
                    <Col lg="4">
                        <p className="mb-2"><strong>Profile Picture</strong></p>
                        <FontAwesomeIcon icon={["fas", "meteor"]}
                            className="rounded text-white bg-dark p-3 mr-3"
                            style={{ "width": "200px", "height": "200px" }}
                        />
                    </Col>
                </Row>
            </SettingsNav>
        </SubNav>
    )
}
