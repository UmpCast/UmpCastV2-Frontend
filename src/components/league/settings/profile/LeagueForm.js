import React from "react"
import { Form as FormikForm } from "formik"

import { TextInput } from "common/Input"

import { Button } from "react-bootstrap"

const LeagueForm = ({formik}) => (
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
        <Button
            disabled={formik.isSubmitting}
            type="submit"
            className="rounded">
            Update Profile
        </Button>
    </FormikForm>
)

export default LeagueForm