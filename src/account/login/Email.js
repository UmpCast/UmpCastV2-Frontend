import React, { Fragment } from "react"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"
import axios from "axios"

import { myUrl, config } from "tools/Api"
import { pickFields, isEmpty, pickFirst } from "tools/Form"
import { TextInput } from "tools/Input"

import RegisterSocial from "./Social"

import { Button } from "react-bootstrap";

export default function RegisterEmail(props) {

    const initialValues = {
        email: ""
    }

    const validationSchema =
        Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required')
        })

    const onNext = async (values, { setSubmitting, setErrors, setStatus }) => {
        axios.post(myUrl("api/users/"), values, config())
            .then()
            .catch(err => {
                const errors = pickFields(err.response.data, Object.keys(initialValues))
                setSubmitting(false)

                if (isEmpty(errors)) {
                    props.updateStep(values)
                } else {
                    setErrors(errors)
                    setStatus(errors.non_form_errors)
                }

            })
    }

    return (
        <Fragment>
            <div className="row mb-2 px-2">
                <RegisterSocial />
            </div>
            <div className="d-inline-flex align-items-center mb-2">
                <hr className="flex-grow-1" />
                <div className="m-2">Or</div>
                <hr className="flex-grow-1" />
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onNext}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik => {
                    const err = pickFirst(formik.status)
                    return (
                        <FormikForm noValidate>
                            {<p className="text-danger text-center mb-0" key={err}>{err}</p>}
                            <TextInput
                                label="Email"
                                name="email"
                                type="email"
                            />
                            <div className="form-group">
                                <Button disabled={formik.isSubmitting} type="submit">next</Button>
                            </div>
                        
                        </FormikForm>
                    )
                }}
            </Formik>
        </Fragment >
    )

}
