import React from 'react'
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import { TitleInput } from "tools/Display"
import { Modal } from "react-bootstrap"

export default function CreateLevel(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const myDisplay = useDisplay()

    const { useShow, useLevels, league_pk } = props
    const [show, setShow] = useShow

    const [levels, setLevels] = useLevels

    const initialValues = {
        title: `Level ${levels.length + 1}`
    }

    const validationSchema =
        Yup.object({
            title: Yup.string()
                .max(20, "maximum of 20 characters")
                .required('Required')
        })

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        ApiSubmit(
            myDisplay,
            () => basicApi(
                "api/levels/",
                { token: token, data: { league: league_pk, ...values } },
                "POST"
            ).then(res => res.data)
        ).then(level => {
            setLevels(levels.concat(level))
            setShow(false)
        }).catch(errors => {
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
