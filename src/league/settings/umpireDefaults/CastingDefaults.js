import React from 'react'
import { Formik, Form as FormikForm } from "formik"

import useUser, { useDisplay, ApiSubmit } from "hooks"
import basicApi from "promises"

import MaxRange from "./MaxRange"
import { Row, Col, Button } from "react-bootstrap"

export default function CastingDefaults(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const myDisplay = useDisplay()

    const { league } = props
    const { default_max_casts, default_max_backups } = league

    const initialValues = {
        default_max_casts: default_max_casts,
        update_casts: false,
        default_max_backups: default_max_backups,
        update_backups: false
    }

    const onSubmit = (values, { setSubmitting }) => {
        ApiSubmit(myDisplay,
            () => basicApi(
                "api/leagues/",
                { pk: league.pk, token: token, data: values },
                "PATCH"
            ).then(res => res.data)
        ).finally(setSubmitting(false))
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {formik => {
                const { default_max_casts, default_max_backups } = formik.values
                return (
                    <FormikForm noValidate>
                        <Row>
                            <Col lg="6" className="pr-4">
                                <MaxRange name="casts" max={default_max_casts} />
                            </Col>
                            <Col lg="6" className="pr-4">
                                <MaxRange name="backups" max={default_max_backups} />
                            </Col>
                        </Row>
                        <Button disabled={formik.isSubmitting} type="submit" className="rounded">Update</Button>
                    </FormikForm>
                )
            }}
        </Formik>
    )
}
