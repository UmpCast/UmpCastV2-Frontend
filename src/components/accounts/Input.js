import React, {Component, cloneElement} from 'react';
import {Form, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";

export class Input extends Component {
    render() {
        const {controlId, label, control, text, form} = this.props

        let error = form.errors[controlId] ? form.errors[controlId] : ''
        return (
            <Form.Group controlId={controlId}>
                <Form.Label>
                    {label}
                </Form.Label>
                <InputGroup>
                    {control ? cloneElement(control, this.errorStatus()) : this.formControl(this.props)}
                    <Form.Control.Feedback type="valid">Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                </InputGroup>
                <Form.Text className="text-muted mt-0">
                    {text}
                </Form.Text>
            </Form.Group>
        )
    }

    formControl() {
        const {handle, controlId, type, placeholder, required} = this.props
        return (
            cloneElement(
                <Form.Control
                    onChange={e => handle(e, controlId)}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                />,
                this.errorStatus()
            )
        )
    }

    errorStatus() {
        const {form, from, controlId} = this.props
        const myForm = form.form === from
        const hasError = controlId in form.errors

        return {
            isValid: myForm && !hasError,
            isInvalid: myForm && hasError
        }
    }
}

const mapStateToProps = state => ({
    form: state.form
})

export default connect(mapStateToProps)(Input);