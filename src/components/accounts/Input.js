import React, { cloneElement } from 'react';
import { Form, InputGroup } from "react-bootstrap";

const formControl = (props) => {
    const { handle, controlId, type, placeholder, required } = props
    return (
        cloneElement(
            <Form.Control
                className="rounded"
                onChange={e => handle(e, controlId)}
                type={type}
                placeholder={placeholder}
                required={required}
            />,
            errorStatus(props)
        ))
}

const errorStatus = (props) => {
    const { form, controlId } = props
    const hasError = controlId in form.errors

    return {
        isValid: form.validated && !hasError,
        isInvalid: form.validated && hasError
    }
}

const Input = (props) => {
    const { controlId, label, control, text, form } = props
    let error = controlId in form.errors ? form.errors[controlId] : ''

    return (
        <Form.Group controlId={controlId}>
            {label ? <Form.Label>{label}</Form.Label> : null}
            <InputGroup>
                {control ? cloneElement(control, errorStatus(props)) : formControl(props)}
                <Form.Control.Feedback type="valid">Valid {label}</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            </InputGroup>
            <Form.Text className="text-muted mt-0">
                {text}
            </Form.Text>
        </Form.Group>
    )
}

export default Input;