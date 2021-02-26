import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser, { useApi } from "common/hooks"
import { TitleInput } from "common/forms"

import { Modal } from "react-bootstrap"

export default function CreateLeague(props) {

    const { useShow, useUls } = props

    const [User, setUser] = useUser(true)
    const Api = useApi(requests)

    const {user} = User
    const [show, setShow] = useShow
    const [uls, setUls] = useUls

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.createLeague(values)
        ).then(res => {
            setUls(uls.concat({ league: res.data }))
            setUser({
                ...User,
                user: {
                    ...user,
                    accepted_leagues: user.accepted_leagues.concat(res.data)
                }
            })
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
            .max(32, "maximum of 32 characters")
            .required("Required")
    })

const requests = {
    createLeague: (values) => [
        "api/leagues/",
        {
            data: values
        },
        "POST"
    ]
}
