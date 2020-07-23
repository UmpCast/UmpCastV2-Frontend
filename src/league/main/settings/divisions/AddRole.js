import React, { useContext } from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import UserContext from "UserContext"
import { TextInput } from "tools/Input"

import {createRole} from "../../../promises"

import {ListGroup, Button} from "react-bootstrap"

export default function AddRole(props) {

    const {token} = useContext(UserContext)[0]

    const {division_pk, useVisible, useMyRoles} = props
    const [visible, setVisible] = useVisible
    const [myRoles, setMyRoles] = useMyRoles

    const initialValues = {
        title: ''
    }

    const validationSchema =
        Yup.object({
            title: Yup.string()
                .max(32, 'Max character length of 32')
                .required('Required')
        })

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        createRole({ title: values.title, division: division_pk, token: token })
            .then(payload => {
                setMyRoles([...myRoles, payload.role])
                
                setVisible(false)
            })
            .catch(err => {
                let errors = err.response.data
                console.log(errors)
                setErrors(errors)
            })
            .finally(() => setSubmitting(false))
    }

    if (!visible) { return null }
    return (
        <ListGroup.Item className="border-0 d-inline-flex w-100 justify-content-between">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {props => (
                    <FormikForm className="d-inline-flex w-100" noValidate>
                        <TextInput
                            name="title"
                            type="text"
                            size="sm"
                            className="rounded"
                            placeholder="Role Name"
                            groupClass="mb-0 w-100 mr-4"
                        />
                        <div className="d-inline-flex">
                            <Button size="sm" variant="secondary rounded mb-auto mr-2" type="button"
                                onClick={() => setVisible(false)}
                            >
                                <small>Cancel</small>
                            </Button>
                            <Button size="sm" variant="primary rounded mb-auto" disabled={props.isSubmitting} type="submit">
                                <small>Create</small>
                            </Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </ListGroup.Item>
    )
}
