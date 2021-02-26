import React from "react"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"

import { useTokenLogin, useApi } from "common/hooks"

import { FocusContainer } from "common/components"
import { OauthUserValidate } from "common/Api"

// import Social from "./Social"
import LoginForm from "./LoginForm"

import { Card } from "react-bootstrap"

export default function Login() {

    const Api = useApi(requests)
    const tokenLogin = useTokenLogin()

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.fetchToken(values)
        ).then(res =>
            tokenLogin(res.data.access_token)
        ).catch(err => {
            if (err.response) {
                let errors = err.response.data
                // TEMP FIX
                const description = errors["error_description"]
                if (description) {
                    errors = {
                        username: "Invalid credentials",
                        password: "Invalid credentials"
                    }
                }

                setErrors(errors)
            }
        }).finally( () =>
            setSubmitting(false)
        )
    }

    return (
        <FocusContainer wrap={true}>
            <Card>
                <Card.Body>
                    <h2 className="text-center">
                        Login
                        </h2>

                    {/* <Social /> */}

                    {/* <HorizontalOr /> */}

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}>
                        {formik =>
                            <LoginForm formik={formik} />}
                    </Formik>

                    <p className="mt-2 mb-0">
                        Don't have an account?
                        <Link
                            to="/register"
                            className="ml-1">
                            Register
                        </Link>
                    </p>
                </Card.Body>
            </Card>
        </FocusContainer>
    );
}

export const HorizontalOr = () => (
    <div className="d-inline-flex align-items-center mb-2 w-100">
        <hr className="flex-grow-1" />
        <div className="m-2">Or</div>
        <hr className="flex-grow-1" />
    </div>
)


const initialValues = {
    username: '',
    password: '',
}

const validationSchema =
    Yup.object({
        username: Yup.string()
            .email('Username must be an email address')
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    })

export const requests = {
    fetchToken: ({ username, password }) => {
        return [
            "api/auth/token/",
            { data: OauthUserValidate(username, password) },
            "POST"
        ]
    }
}