import React from 'react'
import { Formik, Form as FormikForm } from "formik"

import { useApi } from "common/hooks"

import MaxDaysInput from "./MaxDaysInput"

import { Row, Col, Button } from "react-bootstrap"

export default function SignupDefaults(props) {

    const Api = useApi(requests)

    const { league } = props

    const onSubmit = (values, { setSubmitting }) => {
        Api.Submit(() =>
            Api.updateLeague(league.pk, values)
        )
            .finally(setSubmitting(false))
    }

    return (
        <Formik
            initialValues={initialValues(league)}
            onSubmit={onSubmit}>
            {formik => {
                const { scheduling, cancellation } = formik.values

                return (
                    <FormikForm noValidate>
                        <Row>
                            <Col lg="6" className="pr-4">
                                <MaxDaysInput
                                    label="Advanced Scheduling"
                                    name="scheduling"
                                    current={scheduling}
                                    max={90}
                                    text="Maximum days in advanced that an umpire can 
                                    signup for a game." />
                            </Col>
                            <Col lg="6" className="pr-4">
                                <MaxDaysInput
                                    label="Cancellation Window"
                                    name="cancellation"
                                    current={cancellation}
                                    max={30}
                                    text="Minimum days in advanced that an umpire can
                                    cancel a casted signup."/>
                            </Col>
                        </Row>
                        <Button
                            disabled={formik.isSubmitting}
                            type="submit"
                            className="rounded">
                            Update
                            </Button>
                    </FormikForm>
                )
            }}
        </Formik>
    )
}

const initialValues = ({ adv_scheduling_limit, cancellation_period }) => (
    {
        scheduling: adv_scheduling_limit,
        cancellation: cancellation_period
    }
)

const requests = {
    updateLeague: (league_pk, values) => [
        "api/leagues/",
        {
            pk: league_pk,
            data: {
                adv_scheduling_limit: values.scheduling,
                cancellation_period: values.cancellation
            }
        },
        "PATCH"
    ]
}