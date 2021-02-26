import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"

import { TitleInput } from "common/forms"

import { Modal } from "react-bootstrap"

export default function CreateLevel(props) {

    const Api = useApi(requests)

    const { useShow, useLevels, league_pk } = props

    const [levels, setLevels] = useLevels
    const [show, setShow] = useShow

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.createLevel(league_pk, values)
        )
            .then(res => res.data)
            .then(level => {
                setLevels(levels.concat(level))
                setShow(false)
            })
            .catch(errors => {
                setErrors(errors)
                setSubmitting(false)
            })
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size="sm">
            <Formik
                initialValues={initialValues(levels)}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik => (
                    <FormikForm noValidate>
                        <TitleInput
                            action="Create Level"
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

const initialValues = levels => (
    {
        title: `Level ${levels.length + 1}`
    }
)

const validationSchema =
    Yup.object({
        title: Yup.string()
            .max(32, "Too Long!")
            .required('Required!')
    })

const requests = {
    createLevel: (league_pk, values) => [
        "api/levels/",
        {
            data: {
                league: league_pk,
                ...values
            }
        },
        "POST"
    ]
}

