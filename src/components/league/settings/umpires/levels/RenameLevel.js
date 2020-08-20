import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "global/hooks"

import { TitleInput } from "common/Forms"

import { Modal } from "react-bootstrap"

export default function RenameLevel(props) {

    const { useShow, useLevels, level } = props

    const [show, setShow] = useShow
    const [levels, setLevels] = useLevels

    const Api = useApi(renameLevel)

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() => 
            Api.renameLevel(level.pk, values)
        )
            .then(res => {
                setLevels(
                    levels.map(prev =>
                        prev.pk === level.pk ? res.data : prev
                    )
                )
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik => (
                    <FormikForm noValidate>
                        <TitleInput
                            action="Rename Level"
                            confirm="Rename"
                            setShow={setShow}
                            formik={formik}
                        />
                    </FormikForm>
                )}
            </Formik>
        </Modal>

    )
}

const initialValues = level => (
    {
        title: level.title
    }
)

const validationSchema =
    Yup.object({
        title: Yup.string()
            .max(20, "maximum of 20 characters")
            .required('Required')
    })

const renameLevel = (level_pk, values) => [
    "api/levels/",
    {
        pk: level_pk,
        data: values
    },
    "PATCH"
]
