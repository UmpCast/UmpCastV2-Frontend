import React, { useContext } from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import UserContext from "UserContext"
import { TextInput } from "tools/Input"
import { MyAlert } from "tools/Display"

import { createRole } from "../../promises"

import { ListGroup, Button } from "react-bootstrap"

export default function AddRole(props) {

    const [User, setUser] = useContext(UserContext)
    const { token } = User

    const { division_pk, useVisible, useMyRoles } = props
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

    const onSubmit = (values, { setErrors }) => {
        createRole({ token: token }, { title: values.title, division: division_pk })
            .then(payload => {
                const { role } = payload
                setMyRoles([...myRoles, role])
                setUser({
                    ...User, alert:
                        <MyAlert variant="success" className="mb-0">
                            Role <strong>{role.title}</strong> created
                    </MyAlert>
                })

                setVisible(false)
            })
            .catch(err => {
                let errors = err.response.data

                setErrors(errors)
            })
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
                                Cancel
                            </Button>
                            <Button size="sm" variant="primary rounded mb-auto" disabled={props.isSubmitting} type="submit">
                                Create
                            </Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </ListGroup.Item>
    )
}
