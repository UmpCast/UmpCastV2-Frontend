import React, { useContext } from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import UserContext from "UserContext"
import { TextInput } from "tools/Input"
import { MyAlert } from "tools/Display"

import { createLeague } from "league/promises"

import { Modal, Button } from "react-bootstrap"

export default function CreateLeague(props) {

    const [User, setUser] = useContext(UserContext)
    const { token } = User

    const {show, handleClose, myUls} = props
    const [uls, setUls] = myUls

    const initialValues = {
        title: ""
    }

    const validationSchema =
        Yup.object({
            title: Yup.string()
                .max(20, "maximum of 20 characters")
                .required('Required')
        })

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        createLeague({ token: token }, values)
            .then(payload => {
                handleClose()
                setUser({
                    ...payload.user, alert:
                    <MyAlert variant="success" className="mb-0">
                        League created!
                    </MyAlert>
                })

                setSubmitting(false)
                setUls(uls.concat({league: payload.league}))
            })
            .catch(err => {
                let errors = err.response.data
                console.log(errors)

                setErrors(errors)
                setSubmitting(false)
            })
    }

    return (
        <Modal show={show} onHide={handleClose} size="sm">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {formik => (
                    <FormikForm noValidate>
                        <Modal.Header closeButton className="no-border py-3">
                            <Modal.Title>New League</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="no-border py-0">
                            <TextInput
                                name="title"
                                type="text"
                                placeholder="My league's name"
                                className="rounded"
                            />
                        </Modal.Body>
                        <Modal.Footer className="no-border pt-0">
                            <Button type="button" variant="secondary rounded py-1" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button disabled={formik.isSubmitting} type="submit" variant="primary rounded py-1">
                                Create
                            </Button>
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    )
}
