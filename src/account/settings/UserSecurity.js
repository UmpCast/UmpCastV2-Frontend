import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { TextInput } from "tools/Input"

import UserSettingsNav from "./UserSettingsNav"

import { Row, Col, Button } from "react-bootstrap"

export default function UserSecurity() {

    const initialValues = {
        name: '',
        description: '',
        website: '',
        email: ''
    }

    const validationSchema =
        Yup.object({
            first_name: Yup.string()
                .max(32, "first name has max of 32 characters")
                .required('required'),
            last_name: Yup.string()
                .max(32, "last name has max of 32 characters")
                .required('required'),
            password: Yup.string()
                .required('required'),
            email: Yup.string()
                .max(30, "email has max of 32")
                .email('Invalid email address')
                .required('Required'),
            phone_number: Yup.string()
                .min(10, "Ensure this is a 10-digit number")
                .max(10, "Ensure this is a 10-digit number")
        })

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        console.log(values)
    }

    return (
        <UserSettingsNav active="security">
            <div>
                <h3><strong>Change Password</strong></h3>
                <hr className="my-3" />
                <Row>
                    <Col xs={8}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {props => (
                                <FormikForm noValidate>
                                    <TextInput
                                        label="Old Password"
                                        name="password"
                                        type="password"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="New Password"
                                        name="new_password"
                                        type="password"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Confirm Password"
                                        name="new_password2"
                                        type="password"
                                        className="rounded"
                                    />
                                    <div className="d-inline-flex">
                                        <Button variant="light" type="submit" className="rounded mr-2" style={{ "border": "1px solid #E2E4E8" }}>
                                            Update Password
                                    </Button>
                                        <a href="/" className="my-auto">Forgot your password?</a>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </div>
        </UserSettingsNav>
    )
}
