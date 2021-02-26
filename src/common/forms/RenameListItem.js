import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import { useApi } from "common/hooks"
import { TitleInput } from "common/forms"

import { Modal } from "react-bootstrap"

export default function RenameLevel({ useShow, useList, item, action, endpoint }) {

    const [show, setShow] = useShow
    const [list, setList] = useList

    const Api = useApi(requests(endpoint))

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        Api.Submit(() =>
            Api.rename(item.pk, values)
        )
            .then(res => {
                setList(
                    list.map(prev =>
                        prev.pk === item.pk ? res.data : prev
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
                initialValues={initialValues(item)}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnChange={false}
                validateOnBlur={false}>
                {formik => (
                    <FormikForm noValidate>
                        <TitleInput
                            action={action}
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

const initialValues = item => (
    {
        title: item.title
    }
)

const validationSchema =
    Yup.object({
        title: Yup.string()
            .max(32, "Too Long!")
            .required('Required!')
    })

const requests = endpoint => (
    {
        rename: (pk, data) => [
            endpoint,
            { 
                pk, data 
            },
            "PATCH"
        ]
    }
)