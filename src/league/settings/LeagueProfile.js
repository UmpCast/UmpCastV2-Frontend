import React from 'react'
import { useParams } from "react-router-dom"
import { Formik, Form as FormikForm } from "formik"
import * as Yup from "yup"

import useUser, { useDisplay, useFetch, ApiSubmit } from "hooks"
import basicApi from "promises"

import { TextInput } from "tools/Input"
import SubNav from "../SubNav"
import SettingsNav from "./LeagueSettingsNav"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap"

export default function LeagueProfile() {

    const { pk } = useParams()

    const myUser = useUser()
    const { token } = myUser[0]

    const myDisplay = useDisplay()

    const myLeague = useFetch(() => basicApi("api/leagues/", { pk: pk, token: token }).then(res => res.data))
    const [league, setLeague] = myLeague

    if (!league) { return null }

    const fields = ["title", "description", "email", "website_url"]

    let initialValues = {}
    fields.map(field => initialValues[field] = league[field] !== null ? league[field] : "")

    const validationSchema =
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

    const useSubmit = (values, { setSubmitting, setErrors }) => {

        ApiSubmit(
            myDisplay,
            () => basicApi(
                "api/leagues/",
                { pk: pk, token: token, data: values },
                "patch"
            ).then(res => res.data)
        ).then(res => {
            setLeague(res)
        }).catch(err => {
            setErrors(err)
        }).finally(() => setSubmitting(false))
    }

    return (
        <SubNav pk={pk} active="settings" league={league}>
            <SettingsNav pk={pk} active="profile">
                <h3><strong>League Profile</strong></h3>
                <hr className="my-3" />
                <Row>
                    <Col lg="8" className="pr-5">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={useSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}>
                            {props => (
                                <FormikForm noValidate>
                                    <TextInput
                                        label="League Display Name"
                                        name="title"
                                        type="text"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Description"
                                        name="description"
                                        type="text"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        className="rounded"
                                    />
                                    <TextInput
                                        label="Website"
                                        name="website_url"
                                        type="text"
                                        className="rounded"
                                    />
                                    <Button type="submit" className="rounded">Update Profile</Button>
                                </FormikForm>
                            )}
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
            </SettingsNav>
        </SubNav>
    )
}
