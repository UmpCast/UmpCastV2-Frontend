import React, { useState, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import userContext from "../../UserContext"
import { TextInput } from "../../tools/Input"

import { inputLogin } from "../promises"
import { Layout } from "./styles/Layout"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "react-bootstrap"
import { faLaptopHouse, faBullseye } from "@fortawesome/free-solid-svg-icons"

export default function Login() {

    const [User, setUser] = useContext(userContext)

    const { isAuthenticated } = User

    if (isAuthenticated) {
        return <Redirect to="/register/configure" />
    }

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

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        inputLogin({ ...values, payload: {} })
            .then(payload => { setUser({ ...payload.user }); setSubmitting(false) })
            .catch(err => {
                let errors = err.response.data
                console.log(errors)

                // TEMP FIX
                const description = errors["error_description"]
                if (description) {
                    errors = { username: "Invalid credentials", password: "Invalid credentials" }
                }

                setErrors(errors)
                setSubmitting(false)
            })
    }

    return (
        <Layout>
            <div style={{ "width": "500px" }}>
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}>
                        {props => (
                            <FormikForm noValidate>
                                <TextInput
                                    label="Username (email)"
                                    name="username"
                                    type="email"
                                />
                                <TextInput
                                    label="Password"
                                    name="password"
                                    type="password"
                                />
                                <Button disabled={props.isSubmitting} type="submit">Login</Button>
                            </FormikForm>
                        )}
                    </Formik>
                    <p className="mt-2 mb-0"> Don't have an account? <Link to="/register"> Register</Link></p>
                </div>
            </div>
        </Layout>
    );
}