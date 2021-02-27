import React, { Fragment } from "react"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"

import { TextInput } from "common/Input"

// import Social from "../login/Social"
// import { HorizontalOr } from "../login/Login"

import { Button } from "react-bootstrap";

export default function RegisterEmail(props) {

    const { updateStep } = props

    const Api = useApi(requests)

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        Api.validateEmail(values.email)
            .catch(err => {
                setSubmitting(false)

                const errors = err.response.data

                if (errors.email) {
                    setErrors(errors)
                } else {
                    updateStep(values)
                }
            })
    }

    return (
        <Fragment>
            {/* <Social action="Signup" />
            <HorizontalOr /> */}
            <Formik
                {...{
                    initialValues,
                    validationSchema,
                    onSubmit
                }}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik =>
                    <EmailForm formik={formik} />}
            </Formik>
        </Fragment >
    )
}

const EmailForm = ({ formik }) => (
    <FormikForm noValidate>
        <TextInput
            label="Email"
            name="email"
            type="email"
        />
        <div className="form-group">
            <Button disabled={formik.isSubmitting}
                type="submit">next</Button>
        </div>

    </FormikForm>
)

const initialValues = {
    email: ""
}

const validationSchema =
    Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Required')
    })

const requests = {
    validateEmail: (email) => [
        "api/users/",
        {
            data: { email }
        },
        "POST"
    ]
}