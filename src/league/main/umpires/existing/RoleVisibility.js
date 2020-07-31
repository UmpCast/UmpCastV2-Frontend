import React, {useEffect} from 'react'

import useUser from "hooks"
import basicApi from "promises"

import { Form } from "react-bootstrap"
export default function RoleVisibility(props) {

    const myUser = useUser()
    const { token } = myUser[0]

    const { role, useStatus, onChange } = props
    const [status, setStatus] = useStatus

    const checked = status.visibilities.includes(role.pk)

    const onSubmit = () => {

        const { visibilities } = status
        const status_pk = status.pk

        const new_visibilities = checked ?
            visibilities.filter(pk => pk !== role.pk) :
            visibilities.concat(role.pk)

        const new_status = { ...status, visibilities: new_visibilities}
        setStatus(new_status)

        if(onChange) {
            onChange(new_status)
        }

        basicApi(`api/${status.endpoint}/`,
            {
                pk: status_pk,
                token: token,
                data: { visibilities: new_visibilities }
            },
            "PATCH")
            .then(() => { })
            .catch(err => console.log(err))
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
