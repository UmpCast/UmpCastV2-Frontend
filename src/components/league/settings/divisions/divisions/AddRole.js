import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"

import Loader from "common/components"
import { SubmitButtons } from "common/forms"
import { TextInput } from "common/Input"

import { ListGroup } from "react-bootstrap"

export default function AddRole(props) {

    const { useRoles, useAddRole, division } = props

    const [addRole, setAddRole] = useAddRole
    const [roles, setRoles] = useRoles

    const Api = useApi(requests)

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.createRole(division.pk, values)
        )
            .then(res => {
                const new_role = res.data

                setRoles([...roles, new_role])
                setAddRole(false)
            })
            .catch(err => {
                setErrors(err.response.data)
                setSubmitting(false)
            })
    }

    return (
        <Loader dep={[addRole]}>
            <ListGroup.Item
                className="border-0 d-inline-flex w-100 justify-content-between">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {formik => (
                        <FormikForm className="d-inline-flex w-100" noValidate>
                            <TextInput
                                name="title"
                                type="text"
                                size="sm"
                                className="rounded"
                                placeholder="Role Name"
                                groupClass="mb-0 w-100 mr-4"
                            />
                            <SubmitButtons
                                formik={formik}
                                setShow={setAddRole} />
                        </FormikForm>
                    )}
                </Formik>
            </ListGroup.Item>
        </Loader>
    )
}

const initialValues = {
    title: ''
}

const validationSchema =
    Yup.object({
        title: Yup.string()
            .max(32, 'Max character length of 32')
            .required('Required')
    })

const requests = {
    createRole: (division_pk, values) => [
        "api/roles/",
        {
            data: {
                division: division_pk,
                ...values
            }
        },
        "POST"
    ]
}