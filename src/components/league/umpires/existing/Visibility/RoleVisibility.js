import React from 'react'

import { useApi } from "common/hooks"

import { Form } from "react-bootstrap"

export default function RoleVisibility(props) {

    const { role, useStatus, onChange } = props

    const [status, setStatus] = useStatus
    const vis = status.visibilities
    const { pk } = status

    const Api = useApi(requests)

    const checked = vis.includes(role.pk)

    const onSubmit = () => {

        const new_vis = checked ?
            vis.filter(role_pk => role_pk !== role.pk) :
            vis.concat(role.pk)

        const new_status = {
            ...status,
            visibilities: new_vis
        }

        setStatus(new_status)

        if (onChange) {
            onChange(new_status)
        }

        Api.updateVis(status.endpoint, pk, new_vis)
    }

    return (
        <Form.Check
            type="checkbox"
            label={role.title}
            checked={checked}
            className="ml-3 mb-1 mt-1"
            onChange={onSubmit} />
    )
}

const requests = {
    updateVis: (endpoint, status_pk, new_vis) => [
        `api/${endpoint}/`,
        {
            pk: status_pk,
            data: {
                visibilities: new_vis
            }
        },
        "PATCH",
        false
    ]
}
