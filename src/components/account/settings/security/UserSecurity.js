import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser, { useApi } from "common/hooks"

import { OauthUserValidate } from "common/Api"

import UserSettingsContainer from "../SettingsContainer"
import PasswordForm from "./PasswordForm"

import { Row, Col, Button } from "react-bootstrap"

export default function UserSecurity() {

    const Api = useApi(requests)
    const { user } = useUser()

    const onSubmit = (values, { setSubmitting, setErrors, resetForm }) => {

        const { old_password, ...new_values } = values

        Api.Submit(() =>
            Api.validatePassword(user, old_password)
                .then(() =>
                    Api.updatePassword(user, new_values)
                )
        )
            .then(resetForm)
            .catch(err => {
                const errors = err.response.data

                if (errors.error === "invalid_grant") {
                    setErrors({ old_password: "incorrect password" })
                } else {
                    setErrors(errors)
                }
            })
            .finally(() =>
                setSubmitting(false)
            )
    }

    return (
        <UserSettingsContainer active="security">
            <div>
                <h3>
                    <strong>
                        Change Password
                    </strong>
                </h3>
                <hr className="my-3" />
                <Row>
                    <Col lg={8}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {formik => (
                                <FormikForm noValidate>
                                    <PasswordForm />

                                    <div className="d-inline-flex">
                                        <SubmitButton
                                            {...{ formik }} />

                                        <a href="/" className="ml-1 my-auto">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </FormikForm>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </div>
        </UserSettingsContainer>
    )
}

const SubmitButton = ({ formik }) => (
    <Button
        disabled={formik.isSubmitting}
        variant="light border border-muted rounded mr-2"
        type="submit" >
        Update Password
    </Button>
)

const initialValues = {
    old_password: '',
    password: '',
    password2: ''
}

const validationSchema =
    Yup.object({
        password: Yup.string()
            .min(8, "Too Short!")
            .max(128, "Too Long!")
            .required('Required!')
    })

const requests = {
    validatePassword: (user, old_password) => [
        "api/auth/token/",
        { data: OauthUserValidate(user.email, old_password) },
        "POST"
    ],
    updatePassword: (user, values) => [
        "api/users/",
        {
            pk: user.pk,
            data: values
        },
        "PATCH"
    ]
}