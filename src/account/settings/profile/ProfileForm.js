import React from 'react'
import { Form as FormikForm } from "formik"

import { TextInput, MyPhoneInput } from "common/Input"

import { Button } from "react-bootstrap"

export default function UserForm(formik) {
    return (
        <FormikForm noValidate>
            <TextInput
                label="First Name"
                name="first_name"
                type="text"
                className="rounded"
            />
            <TextInput
                label="Last Name"
                name="last_name"
                type="text"
                className="rounded"
            />
            <TextInput
                label="Email"
                name="email"
                type="email"
                className="rounded"
            />
            <MyPhoneInput
                label="Phone Number"
                name="phone_number"
                type="text"
                className="rounded"
            />
            <Button
                disabled={formik.isSubmitting}
                type="submit"
                className="rounded">
                Update Account
            </Button>
        </FormikForm>
    )
}
