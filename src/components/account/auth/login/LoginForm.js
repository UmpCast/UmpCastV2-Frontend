import React from 'react'
import { Form as FormikForm } from "formik"

import { TextInput } from "common/Input"

import {Button} from "react-bootstrap"

const LoginForm = ({ formik }) => (
    <FormikForm noValidate>
        <TextInput
            label="Username (email)"
            name="username"
            type="email"
        />
        <TextInput
            label="Password"
            name="password"
            type="password"
        />
        <Button
            disabled={formik.isSubmitting}
            type="submit">
            Login
        </Button>
    </FormikForm>
)

export default LoginForm
