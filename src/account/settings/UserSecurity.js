import React from 'react'
import { Formik, Form as FormikForm } from "formik"

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { tokenCreateBody } from "common/Api"
import { TextInput } from "common/Input"
import UserSettingsNav from "./UserSettingsNav"

import { Row, Col, Button } from "react-bootstrap"

export default function UserSecurity() {

    const myUser = useUser()
    const myDisplay = useDisplay()

    const { token, user } = myUser[0]

    const initialValues = {
        old_password: '',
        password: '',
        password2: ''
    }

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        const { old_password, ...new_values } = values

        basicApi("api/auth/token/",
            {
                data: tokenCreateBody({
                    email: user.email,
                    password: old_password
                })
            }, "POST")
            .then(() => {
                ApiSubmit(
                    myDisplay,
                    () => basicApi(
                        "api/users/",
                        { pk: user.pk, token: token, data: new_values },
                        "PATCH"
                    ).then(res => res.data)
                ).catch(err => {
                    setErrors(err)
                })
            })
            .catch(err => {
                if (err.error === "invalid_grant") {
                    setErrors({ old_password: "incorrect password" })
                }
            }
            )
            .finally(() => setSubmitting(false))
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
                            onSubmit={onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {formik => (
                                <FormikForm noValidate>
                                    <TextInput
                                        label="Old Password"
                                        name="old_password"
                                        type="password"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="New Password"
                                        name="password"
                                        type="password"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Confirm Password"
                                        name="password2"
                                        type="password"
                                        className="rounded"
                                    />
                                    <div className="d-inline-flex">
                                        <Button
                                            disabled={formik.isSubmitting}
                                            variant="light border border-muted rounded mr-2"
                                            type="submit" >
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
