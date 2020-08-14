import React, { useState } from 'react'
import { useParams } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"

import { useApi, useMountEffect } from "hooks"
import Loader from "common/Display"

import SettingsContainer from "league/settings/SettingsContainer"

import LeagueForm from "./LeagueForm"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col } from "react-bootstrap"

export default function LeagueProfile() {

    const { pk } = useParams()

    const Api = useApi(fetchLeague, updateLeague)
    const useLeague = useState()

    const [league, setLeague] = useLeague

    useMountEffect(() => {
        Api.fetchLeague(pk).then(res =>
            setLeague(res.data)
        )
    })

    const onSubmit = (values, { setSubmitting, setErrors }) => {

        Api.Submit(() =>
            Api.updateLeague(pk, values)
        )
            .then(res =>
                setLeague(res.data)
            )
            .catch(err =>
                setErrors(err.response.data)
            )
            .finally(() =>
                setSubmitting(false)
            )
    }

    if (!league) { return null }

    return (
        <SettingsContainer league={league} active="profile">
            <Loader dep={[league]}>
                <h3><strong>League Profile</strong></h3>
                <hr className="my-3" />
                <Row>
                    <Col lg="8" className="pr-5">
                        <Formik
                            initialValues={initialValues(league)}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {formik => <LeagueForm formik={formik} />}
                        </Formik>
                    </Col>
                    <Col lg="4">
                        <p className="mb-2"><strong>Profile Picture</strong></p>
                        <FontAwesomeIcon icon={["fas", "meteor"]}
                            className="rounded text-white bg-dark p-3 mr-3"
                            style={{ "width": "200px", "height": "200px" }}
                        />
                    </Col>
                </Row>
            </Loader>
        </SettingsContainer>
    )
}

const initialValues = (league) => {
    let initialValues = {}

    for (const field of ["title", "description", "email", "website_url"]) {
        initialValues[field] = (
            league[field] ? league[field] : ""
        )
    }

    return initialValues
}

const validationSchema = (
    Yup.object({
        name: Yup.string()
            .max(20, "Maximum of 20 characters"),
        description: Yup.string()
            .max(75, "Maximum of 75 characters"),
        website_url: Yup.string()
            .max(30, "Maximum of 30 characters"),
        email: Yup.string()
            .max(30, "Maximum of 30 characters")
    })
)

const fetchLeague = (league_pk) => [
    "api/leagues/",
    {
        pk: league_pk
    }
]

const updateLeague = (league_pk, values) => [
    "api/leagues/",
    {
        pk: league_pk,
        data: values
    },
    "PATCH"
]