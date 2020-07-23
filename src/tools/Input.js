import React, {forwardRef} from 'react'
import { useField } from "formik"

import PhoneInput from "react-phone-number-input/input"
import { Form } from "react-bootstrap"

export const TextInput = ({ label, submitted, groupClass, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <Form.Group className={groupClass}>
            {label ? <Form.Label>{label}</Form.Label> : null }
            <Form.Control {...field} {...props}
                isInvalid={meta.error}
            />
            <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
        </Form.Group>
    )
}

export const MyPhoneInput = ({ label, ...props }) => {
    const [, meta, helpers] = useField(props)

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <PhoneInput
                        useNationalFormatForDefaultCountryValue={false}
                        defaultCountry="US"
                        inputComponent={PhoneRef}
                        onChange={(number) => {number && helpers.setValue(number.substring(2))}}
                        isInvalid={meta.error}
                    />
            <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
        </Form.Group>
    )
}

const PhoneControl = (props, ref) => {
    return (
        <Form.Control
            {...props}
            ref={ref}
            className="rounded-right"
        />)
}

const PhoneRef = forwardRef(PhoneControl)