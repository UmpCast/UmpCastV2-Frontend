import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { TitleInput } from "tools/Display"

import { Modal } from "react-bootstrap"

export default function RenameLevel(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const myDisplay = useDisplay()

    const { useShow, useLevels, level } = props
    const [show, setShow] = useShow
    const [levels, setLevels] = useLevels

    const initialValues = {
        title: level.title
    }

    const validationSchema =
        Yup.object({
            title: Yup.string()
                .max(20, "maximum of 20 characters")
                .required('Required')
        })

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        ApiSubmit(myDisplay, () => basicApi("api/levels/", { pk: level.pk, token: token, data: values }, "PATCH"))
            .then(payload => {
                setLevels(levels.map(prev =>  prev.pk === level.pk ? payload : prev))
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
