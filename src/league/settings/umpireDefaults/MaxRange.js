import React from 'react'

import { RangeInput, CheckboxInput } from "tools/Input"

import { Form } from "react-bootstrap"

export default function MaxRange(props) {
    const { name, max } = props

    return (
        <Form.Group>
            <Form.Label className="w-100">
                <strong>Max {name[0].toUpperCase() + name.slice(1)}</strong>
                <span className="float-right mr-1">{max} Games</span>
            </Form.Label>
            <RangeInput
                name={`default_max_${name}`}
                min={0}
                max={10}
            />
            <CheckboxInput
                name={`update_${name}`}
                label={<small className="form-text">Update current umpires</small>}
            />
        </Form.Group>
    )
}
