import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import UserSettingsNav from "./SettingsContainer"

import { Row, Col, Form, InputGroup, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UserNotifications() {

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

    const onSubmit = values => {
        console.log(values)
    }

    return (
        <UserSettingsNav active="notifications">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {props => (
                    <FormikForm noValidate>
                        <h3><strong>Notifications</strong></h3>
                        <hr className="my-3" />
                        <Row className="mb-3">
                            <Col>
                                <h5 className="mb-3"><strong>Notification Methods</strong></h5>
                                <div className="d-inline-flex justify-content-between w-100 mb-3">
                                    <div>
                                        <FontAwesomeIcon className="fa-lg text-primary my-auto mr-3" icon={'envelope'} />
                            Receive Email Notifications
                            </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch2"
                                        label=""
                                    />
                                </div>
                                <div className="d-inline-flex justify-content-between w-100 mb-3">
                                    <div>
                                        <FontAwesomeIcon className="fa-lg text-primary my-auto mr-3" icon={'comment-dots'} />
                            Receive Text Notifications
                            </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch2"
                                        label=""
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h5 className="mb-3"><strong>Notify me!</strong></h5>
                                <div className="d-inline-flex justify-content-between w-100 mb-3">
                                    <div className="d-flex flex-column mr-3">
                                        <div className="d-inline-flex">
                                            <InputGroup style={{ "width": "45px" }} size="sm" className="my-auto mr-2">
                                                <Form.Control type="number" placeholder={3} />
                                            </InputGroup>
                                            <h6 className="mb-0 my-auto"><strong> days before a game</strong></h6>
                                        </div>
                                        <small className="text-muted">
                                            Reminder for games you are casted
                            </small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch2"
                                        label=""
                                    />
                                </div>
                                <div className="d-inline-flex justify-content-between w-100 mb-3">
                                    <div className="d-flex flex-column mr-3">
                                        <h6 className="mb-0"><strong>League Announcements</strong></h6>
                                        <small className="text-muted">
                                            Announcements made by leagues you are associated with
                            </small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch2"
                                        label=""
                                    />
                                </div>
                                <div className="d-inline-flex justify-content-between w-100 mb-3">
                                    <div className="d-flex flex-column mr-3">
                                        <h6 className="mb-0"><strong>Game Changes</strong></h6>
                                        <small className="text-muted">
                                            Changes to the logistics of games you are casted / backup for:
                                            cancellations, rescheduling, input errors
                            </small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch2"
                                        label=""
                                    />
                                </div>
                                <div className="d-inline-flex justify-content-between w-100 mb-3">
                                    <div className="d-flex flex-column mr-3">
                                        <h6 className="mb-0"><strong>Reassignments</strong></h6>
                                        <small className="text-muted">
                                            Promotion from backup to casted or demotions made by managers
                            </small>
                                    </div>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch2"
                                        label=""
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Button variant="primary rounded px-4 mt-2 mx-auto">Confirm Changes</Button>
                        </Row>
                    </FormikForm>
                )
                }
            </Formik >
        </UserSettingsNav>
    )
}