import React, { useState } from 'react'

import { useApi } from "common/hooks"

import { Form } from "react-bootstrap"
export default function UpdateCasts(props) {

    const Api = useApi(requests)

    const { status, type, onChange } = props
    const [max, setMax] = useState(status[`max_${type}`])

    const onMouseUp = e => {
        const new_max = e.target.value

        onChange({
            ...status,
            [`max_${type}`]: new_max
        })

        Api.adjustMaxScheduling(status.pk, type, new_max)
    }

    return (
        <Form.Group className="my-0 text-center">
            <small className="text-muted">
                Max {max}
            </small>
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

const requests = {
    adjustMaxScheduling: (status_pk, type, new_max) => [
        "api/user-league-status/",
        {
            pk: status_pk,
            data: {
                [`max_${type}`]: new_max
            }
        },
        "PATCH"
    ]
}