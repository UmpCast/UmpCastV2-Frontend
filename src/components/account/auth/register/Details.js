import React from "react"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi, useTokenLogin } from "common/hooks"

import { TextInput, MyPhoneInput } from "common/Input"
import { OauthUserValidate } from "common/Api"

import { Row, Col, Button } from "react-bootstrap"

export default function RegisterDetails(props) {

    const { migrated } = props

    const Api = useApi(requests)
    const tokenLogin = useTokenLogin()

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        const new_values = handlePhone(values)

        Api.register(new_values)
            .then(() =>
                Api.fetchToken(values)
            )
            .then(res =>
                tokenLogin(res.data.access_token)
            )
            .catch(err => {
                setErrors(err.response.data)
                setSubmitting(false)
            })
    }

    return (
        <div className="mt-2">
            <Formik
                initialValues={initialValues(migrated)}
                {... {
                    validationSchema,
                    validate,
                    onSubmit
                }}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik =>
                    <DetailsForm formik={formik} />}
            </Formik>
        </div>
    )
}

const DetailsForm = ({ formik }) => {
    return (
        <FormikForm>
            <Row>
                <Col sm={12} md={6}>
                    <TextInput
                        label="First name"
                        name="first_name"
                        type="text"
                    />
                </Col>
                <Col sm={12} md={6}>
                    <TextInput
                        label="Last name"
                        name="last_name"
                        type="text"
                    />
                </Col>
            </Row>
            <TextInput
                label="Password"
                name="password"
                type="password"
            />
            <TextInput
                label="Confirm Password"
                name="password2"
                type="password"
            />
            <MyPhoneInput
                label="Phone Number"
                name="phone_number"
                type="text"
                className="rounded"
            />

            <Button
                disabled={formik.isSubmitting}
                type="submit">
                Register
            </Button>
        </FormikForm>
    )
}

const initialValues = migrated => ({
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
    phone_number: '',
    ...migrated
})


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
        password2: Yup.string()
            .required('required'),
        phone_number: Yup.string()
            .min(12, "Ensure this is a 10-digit number")
            .max(12, "Ensure this is a 10-digit number")
    })

const validate = values => {
    const match = values.password === values.password2
        || values.password2 === ""

    return match ? {} : { password2: "passwords don't match" }
}

const handlePhone = values => {
    let new_values = values

    const { phone_number } = new_values

    if (phone_number === "") {
        delete new_values.phone_number
    } else {
        new_values.phone_number = phone_number.replace(/\D/g, '')
    }

    return new_values
}

const requests = {
    register: (values) => [
        "api/users/",
        {
            data: values
        },
        "POST"
    ],
    fetchToken: ({ email, password }) => [
        "api/auth/token/",
        { data: OauthUserValidate(email, password) },
        "POST"
    ]
}

