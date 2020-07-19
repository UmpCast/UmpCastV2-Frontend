import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { TextInput } from "../../../tools/Input"

import SettingsHeader from "./SettingsHeader"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap"

export default function LeagueUmpires() {

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
        <div>
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
                            <Col lg="6" className="pr-5">
                                <TextInput
                                    label={<strong>League Display Name</strong>}
                                    name="name"
                                    type="text"
                                    className="rounded"
                                />
                            </Col>
                            <Col lg="6" className="pr-5">
                                <TextInput
                                    label={<strong>Description</strong>}
                                    name="description"
                                    type="text"
                                    className="rounded"
                                />
                            </Col>
                        </Row>
                        <TextInput
                            label={<strong>Email</strong>}
                            name="email"
                            type="email"
                            className="rounded"
                        />
                        <TextInput
                            label={<strong>Website</strong>}
                            name="website"
                            type="text"
                            className="rounded"
                        />
                        <Button type="submit" className="rounded">Update Profile</Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    )
}
