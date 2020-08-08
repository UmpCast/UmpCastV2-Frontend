import React from 'react'

import RoleVisibility from "./RoleVisibility"

import { Dropdown } from "react-bootstrap"

export default function DivisionVisibility(props) {
    
    const { division, useStatus, onChange } = props
    const { roles } = division
    const role_pks = roles.map(role => role.pk)

    let vis_count = 0
    useStatus[0].visibilities.map(role_pk => role_pks.includes(role_pk) && (vis_count ++))

    const fill = filled(vis_count, roles.length)

    const formatted_roles = roles.map(role =>
        <RoleVisibility role={role} useStatus={useStatus} onChange={onChange} key={role.pk} />
    )

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant={fill === "empty" ? "light" : "primary"}
                className={`rounded-pill py-0 mx-1 ump-visibility-${fill}`}
                id="dropdown-basic">
                {division.title}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {formatted_roles}
            </Dropdown.Menu>
        </Dropdown>
    )
}

const filled = (vis_count, role_count) => {

    if (vis_count === role_count && role_count !== 0) {
        return "full"
    } else if (vis_count > 0) {
        return "partial"
    }

    return "empty"
}
