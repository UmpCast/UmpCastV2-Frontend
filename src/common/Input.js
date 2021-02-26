import React from "react"
import { useField } from "formik"
import Moment from "moment"
import momentLocalizer from "react-widgets-moment"
import DateTimePicker from "react-widgets/lib/DateTimePicker"

import { Form } from "react-bootstrap"

export const TextInput = ({ label, groupClass, noError, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <Form.Group className={groupClass}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            <Form.Control
                autoComplete="off"
                {...field}
                {...props}
                isInvalid={noError ? false : meta.error}
            />
            {noError ? null : (
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}

export const MyPhoneInput = ({ label, groupClass, noError, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <Form.Group className={groupClass}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            <Form.Control
                {...field}
                {...props}
                isInvalid={noError ? false : meta.error}
                onChange={(e) => {
                    field.onChange(props.name)(formatPhone(e.target.value))
                }}
            />
            {noError ? null : (
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}

export const DateTimeInput = ({ label, groupClass, noError, ...props }) => {
    Moment.locale("en")
    momentLocalizer()

    const [field, meta, helpers] = useField(props)
    
    return (
        <Form.Group className={groupClass}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            <DateTimePicker
                {...field}
                {...props}
                onChange={(value) => helpers.setValue(value)}
            />
            {noError ? null : (
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}

export const formatPhone = (number) => {
    const num = number.replace(/\D/g, "")

    if (num !== "" && !RegExp(/^\d+$/).test(num.slice(-1))) {
        return num.slice(0, -1)
    }

    const len = num.length

    return (
        (len > 0 ? num.slice(0, 3) : "") +
        (len > 3 ? ` ${num.slice(3, 6)}` : "") +
        (len > 6 ? ` ${num.slice(6, 10)}` : "")
    )
}

export const RangeInput = (props) => {
    const [field] = useField(props)
    return <Form.Control type="range" {...field} {...props} custom />
}

export const SelectionInput = ({
    children,
    label,
    groupClass,
    noError,
    ...props
}) => {
    const [field, meta] = useField(props)

    return (
        <Form.Group className={groupClass}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            <Form.Control
                as="select"
                {...field}
                {...props}
                isInvalid={noError ? false : meta.error}
            >
                {children}
            </Form.Control>
            {noError ? null : (
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            )}
        </Form.Group>
    )
}

export const ToggleInput = (props) => {
    const [field] = useField(props)
    return (
        <Form.Check
            {...field}
            {...props}
            checked={field.value}
            id={props.name}
        />
    )
}

export const FileInputHidden = ({ setRef, ...props }) => {
    const [field] = useField(props)
    return <Form.File {...field} {...props} ref={setRef} />
}
