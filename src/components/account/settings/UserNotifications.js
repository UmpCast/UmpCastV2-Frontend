import React from 'react'
import { Formik, Form as FormikForm } from "formik"

import useUser, { useApi } from "common/hooks"
import { ToggleInput } from "common/Input"

import UserSettingsNav from "./SettingsContainer"

import { Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function UserNotifications() {

    const [User, setUser] = useUser(true)
    const Api = useApi(requests)

    const { user } = User
    const { pk } = user

    const onSubmit = new_values => {
        Api.Submit(() =>
            Api.updateProfile(pk, new_values)
        )
            .then(res => {
                setUser({
                    ...User,
                    user: res.data
                })
            })
    }

    return (
        <UserSettingsNav active="notifications">
            <h3>
                <strong>Notifications</strong>
            </h3>
            <hr className="my-3" />
            <Formik
                initialValues={initialValues(user)}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {() => (
                    <FormikForm noValidate>
                        <Row className="mb-3">
                            <Col xs={12} lg={6} className="mb-3 mb-lg-0">
                                <h5 className="mb-3">
                                    <strong>Notification Methods</strong>
                                </h5>
                                <ToggleWrapper>
                                    <div>
                                        <FontAwesomeIcon
                                            className="fa-lg text-primary my-auto mr-3"
                                            icon="envelope" />
                                        Receive Email Notifications
                                    </div>
                                    <ToggleInput
                                        name="email_notifications"
                                        type="switch"
                                        label=""
                                    />
                                </ToggleWrapper>
                                <ToggleWrapper>
                                    <div>
                                        <FontAwesomeIcon
                                            className="fa-lg text-primary my-auto mr-3"
                                            icon="comment-dots" />
                                        Receive Text Notifications
                                    </div>
                                    <ToggleInput
                                        name="phone_notifications"
                                        type="switch"
                                        label=""
                                    />
                                </ToggleWrapper>
                            </Col>
                            <Col>
                                <h5 className="mb-3">
                                    <strong>Notify me!</strong>
                                </h5>
                                <ToggleWrapper>
                                    <div className="d-flex flex-column mr-3">
                                        <h6 className="mb-0">
                                            <strong>League Announcements</strong>
                                        </h6>
                                        <small className="text-muted">
                                            Announcements made by leagues you are associated with
                                        </small>
                                    </div>
                                    <ToggleInput
                                        name="league_notifications"
                                        type="switch"
                                        label=""
                                    />
                                </ToggleWrapper>
                                <ToggleWrapper>
                                    <div className="d-flex flex-column mr-3">
                                        <h6 className="mb-0">
                                            <strong>Game Changes</strong>
                                        </h6>
                                        <small className="text-muted">
                                            Changes to the details (date, time, name, etc.) of a game
                                        </small>
                                    </div>
                                    <ToggleInput
                                        name="game_notifications"
                                        type="switch"
                                        label=""
                                    />
                                </ToggleWrapper>
                                <ToggleWrapper>
                                    <div className="d-flex flex-column mr-3">
                                        <h6 className="mb-0">
                                            <strong>Reassignments</strong>
                                        </h6>
                                        <small className="text-muted">
                                            Promotion from backup to casted or demotions made by managers
                                        </small>
                                    </div>
                                    <ToggleInput
                                        name="application_notifications"
                                        type="switch"
                                        label=""
                                    />
                                </ToggleWrapper>
                            </Col>
                        </Row>
                        <Row>
                            <Button variant="primary rounded px-4 mt-2 mx-auto" type="submit">
                                Confirm Changes
                            </Button>
                        </Row>
                    </FormikForm>
                )}
            </Formik >
        </UserSettingsNav>
    )
}

const ToggleWrapper = ({ children }) => (
    <div className="d-inline-flex justify-content-between w-100 mb-3">
        {children}
    </div>
)

const initialValues = (user) => {
    const {
        email_notifications,
        phone_notifications,
        league_notifications,
        game_notifications,
        application_notifications
    } = user

    return ({
        email_notifications,
        phone_notifications,
        league_notifications,
        game_notifications,
        application_notifications
    })
}

const requests = {
    updateProfile: (user_pk, values) => [
        "api/users/",
        {
            pk: user_pk,
            data: values
        },
        "PATCH"
    ]
}