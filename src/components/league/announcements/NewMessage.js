import React from 'react'
import { useParams } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"

import Loader from "common/components"

import { SubmitButtons } from "common/forms"
import { TextInput } from "common/Input"

import { Row, Col, Card } from "react-bootstrap"

export default function NewMessage({ useShow, useReset }) {

    const { pk } = useParams()

    const Api = useApi(requests)

    const [show, setShow] = useShow
    const [, setReset] = useReset

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.createNotif(pk, values)
        )
            .then(() => {
                setShow(false)
                setReset(true)
            })
            .catch(err => {
                setErrors(err.response.data)
                setSubmitting(false)
            })
    }

    return (
        <Loader dep={show}>
            <Card className="w-100 mt-3">
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {formik => (
                        <FormikForm noValidate>
                            <Card.Header>
                                New Announcement
                        </Card.Header>
                            <Card.Body className="pb-0">
                                <Row>
                                    <Col xs={12} md={6} lg={4}>
                                        <TextInput
                                            name="subject"
                                            placeholder="Subject"
                                            className="rounded"/>
                                    </Col>
                                </Row>
                                <TextInput
                                    name="message"
                                    as="textarea"
                                    rows="3"
                                    placeholder="Spring season is starting up, make sure to open your schedule!"
                                    className="rounded" />
                            </Card.Body>
                            <Card.Footer className="border-0 pt-0 bg-white">
                                <SubmitButtons
                                    formik={formik}
                                    setShow={setShow}
                                    className="ml-auto debug" />
                            </Card.Footer>
                        </FormikForm>
                    )}
                </Formik>
            </Card >
        </Loader>
    )
}

const initialValues = {
    subject: "",
    message: ""
}

const validationSchema =
    Yup.object({
        subject: Yup.string()
            .max(64, "Too Long!"),
        message: Yup.string()
            .max(1024, "Too Long!")
            .required('Required!'),
    })


const requests = {
    createNotif: (league_pk, values) => [
        "api/league-notifications/",
        {
            data: {
                league: league_pk,
                ...values
            }
        },
        "POST"
    ]
}

