import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { TextInput, MyPhoneInput } from "../../tools/Input"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap"

export default function UserProfile() {

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
        <div>
            <h3><strong>User Profile</strong></h3>
            <hr class="my-3" />
            <Row>
                <Col lg="8" className="pr-5">
                    <Row className="mb-4">
                        <Col>
                            <h5><strong>Edit Details</strong></h5>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}>
                                {props => (
                                    <FormikForm noValidate>
                                        <TextInput
                                            label="First Name"
                                            name="first_name"
                                            type="text"
                                            className="rounded"
                                        />
                                        <TextInput
                                            label="Last Name"
                                            name="last_name"
                                            type="text"
                                            className="rounded"
                                        />
                                        <TextInput
                                            label="Email"
                                            name="email"
                                            type="email"
                                            className="rounded"
                                        />
                                        <MyPhoneInput
                                            label="Phone Number"
                                            name="phone_number"
                                            type="number"
                                            className="rounded"
                                        />
                                        <Button type="submit" className="rounded">Update Account</Button>
                                    </FormikForm>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                </Col>
                <Col lg="4">
                    <h5 className="mb-3"><strong>Profile Picture</strong></h5>
                    <FontAwesomeIcon icon={["fas", "baseball-ball"]} transform={{ rotate: 30 }}
                        className="rounded-circle text-white bg-dark p-4 mr-3"
                        style={{ "width": "200px", "height": "200px" }}
                    />
                </Col>
            </Row>
        </div>
    )
}

