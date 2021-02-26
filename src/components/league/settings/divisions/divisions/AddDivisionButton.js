import React, { useState } from "react"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"

import { TitleInput } from "common/forms"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Modal, Button } from "react-bootstrap"

export default function AddDivisionButton(props) {
    const { league, handleNewDivision } = props

    const [show, setShow] = useState(false)

    const Api = useApi(requests)

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() => Api.createDivision(league.pk, values))
            .then((res) => {
                const new_division = res.data

                handleNewDivision(new_division)
                setShow(false)
            })
            .catch((err) => {
                console.log(err)
                setErrors(err.response.data)
            })
            .finally(() => setSubmitting(false))
    }

    return (
        <div className="mx-3">
            <Button
                variant="primary rounded"
                onClick={() => setShow(true)}
                block
            >
                <FontAwesomeIcon icon="plus" className="mr-1 fa-sm" />
                Add Division
            </Button>
            <Modal show={show} onHide={() => setShow(false)} size="sm">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {(formik) => (
                        <FormikForm noValidate>
                            <TitleInput
                                action="Create Division"
                                confirm="Create"
                                setShow={setShow}
                                formik={formik}
                            />
                        </FormikForm>
                    )}
                </Formik>
            </Modal>
        </div>
    )
}

const initialValues = {
    title: ""
}

const validationSchema = Yup.object({
    title: Yup.string()
        .max(32, "Max character length of 32")
        .required("Required")
})

const requests = {
    createDivision: (league_pk, values) => [
        "api/divisions/",
        {
            data: {
                league: league_pk,
                ...values
            }
        },
        "POST"
    ]
}
