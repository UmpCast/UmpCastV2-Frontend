import React, { forwardRef } from 'react'
import {Form} from 'react-bootstrap'

const PhoneFormControl = (props, ref) => {
    return (
        <Form.Control
            {...props}
            ref={ref}
            className="rounded"
        />)
}

export default forwardRef(PhoneFormControl)