import React from "react"

import { RangeInput } from "common/Input"

import { Form } from "react-bootstrap"

const MaxDaysInput = (props) => {
    const { label, name, current, max, text } = props

    return (
        <Form.Group>
            <Form.Label className="w-100">
                <strong>{label}</strong>
                <span className="float-right mr-1">{current} Days</span>
            </Form.Label>
            <RangeInput
                name={name}
                min={0}
                max={max}
            />
            <Form.Text className="text-muted">
                {text}
            </Form.Text>
        </Form.Group>
    )
}

export default MaxDaysInput