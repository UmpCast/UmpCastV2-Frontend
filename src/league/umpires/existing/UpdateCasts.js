import React, { useState } from 'react'

import useUser from "hooks"
import basicApi from "promises"

import { Form } from "react-bootstrap"
export default function UpdateCasts(props) {

    const { token } = useUser()[0]

    const { onChange, status, type } = props
    const [max, setMax] = useState(status[`max_${type}`])

    const onMouseUp = e => {
        const new_max = e.target.value
        onChange({ ...status, [`max_${type}`]: new_max })
        basicApi(
            "api/user-league-status/",
            { pk: status.pk, token: token, data: { [`max_${type}`]: new_max } },
            "PATCH"
        )
    }

    return (
        <Form.Group className="my-0 text-center">
            <small className="text-muted">Max {max}</small>
            <Form.Control
                type="range"
                min="0"
                max="10"
                defaultValue={max}
                onChange={e => setMax(e.target.value)}
                onMouseUp={onMouseUp}
                custom />
        </Form.Group>
    )
}
