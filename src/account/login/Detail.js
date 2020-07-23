import React from "react"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { fillFields, reduceArrays } from "tools/Form"
import { TextInput, MyPhoneInput } from "tools/Input"

import { inputRegister } from "../promises"

import { Button } from "react-bootstrap"

export default function RegisterDetail(props) {

    const fields = ["first_name", "last_name", "password", "password2", "phone_number"]

    const initialValues = fillFields(fields)

    const validate = values => {
        const match = (values.password === values.password2) || values.password2 === ""
        return match ? {} : { password2: "passwords don't match" }
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
            password2: Yup.string()
                .required('required'),
            phone_number: Yup.string()
                .min(10, "Ensure this is a 10-digit number")
                .max(10, "Ensure this is a 10-digit number")
        })

    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        Object.keys(values).map(key => values[key] === "" && delete values[key])
        inputRegister({ ...props.migrated, ...values })
            .then(payload => props.setUser(payload.user))
            .catch(err => {
                const errors = reduceArrays(err.response.data)

                setErrors(errors)
                setStatus(errors.non_form_errors)
                setSubmitting(false)
            })
    }

    return (
        <div className="mt-2">
            <Formik
                initialValues={initialValues}
                validate={validate}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik => (
                    <FormikForm>
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <TextInput
                                    label="First name"
                                    name="first_name"
                                    type="text"
                                />
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <TextInput
                                    label="Last name"
                                    name="last_name"
                                    type="text"
                                />
                            </div>
                        </div>
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
                            label="Phone Number (optional)"
                            name="phone_number"
                            type="text"
                        />
                        <div className="form-group">
                            <Button disabled={formik.isSubmitting} type="submit">Register</Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </div>
    )
}