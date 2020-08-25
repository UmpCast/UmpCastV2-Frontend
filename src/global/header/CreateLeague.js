import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"
import { TitleInput } from "common/Forms"

import { Modal } from "react-bootstrap"

export default function CreateLeague(props) {

    const { useShow, useUls } = props

    const Api = useApi(createLeague)

    const [show, setShow] = useShow
    const [uls, setUls] = useUls

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.createLeague(values)
        ).then(res => {
            setUls(uls.concat({ league: res.data }))
            setShow(false)
        })
            .catch(err => {
                setErrors(err.response.data)
                setSubmitting(false)
            })
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="sm">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik => (
                    <FormikForm noValidate>
                        <TitleInput
                            action="Create League"
                            confirm="Create"
                            formik={formik}
                            setShow={setShow}
                        />
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    )
}

const initialValues = {
    title: ""
}

const validationSchema =
    Yup.object({
        title: Yup.string()
            .max(20, "maximum of 20 characters")
            .required("Required")
    })

const createLeague = (values) => [
    "api/leagues/",
    {
        data: values
    },
    "POST"
]
