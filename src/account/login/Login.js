import React from "react"
import { Link, Redirect } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser from "hooks"
import { TextInput } from "tools/Input"
import { FocusContainer } from "tools/Display"

import { inputLogin } from "../promises"

import { Button } from "react-bootstrap"

export default function Login() {

    const [User, setUser] = useUser()

    const { isConfigured, isAuthenticated } = User

    if (isConfigured){
        return <Redirect to="/" />
    } else if (isAuthenticated) {
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
        inputLogin({ ...values})
            .then(payload => { setSubmitting(false); setUser({ ...payload.user }) })
            .catch(err => {
                console.log(err)
                let errors = err.response.data

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
        <FocusContainer>
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
        </FocusContainer>
    );
}