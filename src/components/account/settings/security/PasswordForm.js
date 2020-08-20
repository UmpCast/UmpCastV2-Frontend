import React, { Fragment } from 'react'

import { TextInput } from "common/Input"

export default function PasswordForm() {
    return (
        <Fragment>
            <TextInput
                label="Old Password"
                name="old_password"
                type="password"
                className="rounded"
            />
            <TextInput
                label="New Password"
                name="password"
                type="password"
                className="rounded"
            />
            <TextInput
                label="Confirm Password"
                name="password2"
                type="password"
                className="rounded"
            />
        </Fragment>
    )
}
