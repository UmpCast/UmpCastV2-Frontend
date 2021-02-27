import React, { useState } from "react"
import { Formik, Form as FormikForm } from "formik"

import * as Yup from "yup"

import { useApi } from "common/hooks"

import { Button, Modal } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { TextInput, SelectionInput, DateTimeInput } from "common/Input"
import { Fragment } from "react"

export default function AddGameButton({ handleNewGame, league }) {
    const Api = useApi(requests)

    const [show, setShow] = useState(false)

    const onSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
        Api.Submit(() => Api.createGame(values))
            .then((res) => {
                handleNewGame(res.data)
                resetForm()
            })
            .catch((err) => {
                setErrors(err.response.data)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    const divisionOptions = league.divisions.map((div) => (
        <option value={div.pk} key={div.pk}>
            {div.title}
        </option>
    ))

    return (
        <Fragment>
            <Button
                variant="success rounded"
                className="mx-2 px-2 py-1"
                onClick={() => setShow(true)}
            >
                <FontAwesomeIcon icon="plus" className="mr-1 fa-sm" />
                Add Games
            </Button>
            <Modal show={show} onHide={() => setShow(false)} size="md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    onChange={console.log}
                >
                    {(formik) => (
                        <FormikForm noValidate>
                            <Modal.Header
                                closeButton
                                className="no-border py-3"
                            >
                                <Modal.Title>Create Game</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="no-border py-0">
                                <TextInput
                                    label="Game title"
                                    name="title"
                                    type="text"
                                    className="rounded"
                                />
                                <SelectionInput
                                    label="Division"
                                    name="division"
                                    className="rounded"
                                >
                                    <option>Select Division</option>
                                    {divisionOptions}
                                </SelectionInput>
                                <DateTimeInput
                                    label="Start Time"
                                    name="date_time"
                                />
                                <TextInput
                                    label="Location"
                                    name="location"
                                    type="text"
                                    className="rounded"
                                />
                                <TextInput
                                    label="Description (optional)"
                                    name="description"
                                    type="text"
                                    className="rounded"
                                />
                            </Modal.Body>
                            <Modal.Footer className="no-border pt-0">
                                <Button
                                    type="button"
                                    variant="secondary rounded py-1"
                                    onClick={() => setShow(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={formik.isSubmitting}
                                    type="submit"
                                    variant="primary"
                                    className="rounded py-1"
                                >
                                    Create
                                </Button>
                            </Modal.Footer>
                        </FormikForm>
                    )}
                </Formik>
            </Modal>
        </Fragment>
    )
}

const initialValues = {
    title: "",
    division: "",
    date_time: new Date(),
    location: "",
    description: ""
}

const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    division: Yup.number().required("Required"),
    date_time: Yup.string().required("Required"),
    location: Yup.string().required("Required")
})

const requests = {
    createGame: (values) => [
        "api/games/",
        {
            data: values
        },
        "POST"
    ]
}
