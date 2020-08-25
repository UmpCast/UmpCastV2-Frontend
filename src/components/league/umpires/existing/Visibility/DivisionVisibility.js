import React from 'react'

import RoleVisibility from "./RoleVisibility"

import { Dropdown } from "react-bootstrap"

export default function DivisionVisibility(props) {

    const { division, useStatus, onChange } = props

    const { roles } = division

    const styles = {
        fill: filled(roles, useStatus[0]),
        title: division.title,
    }

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant={styles.fill === "empty" ? "light" : "primary"}
                className={`rounded-pill py-0 mx-1 ump-visibility-${styles.fill}`}>
                {styles.title}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <ListRoles
                    roles={roles}
                    useStatus={useStatus}
                    onChange={onChange} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

const ListRoles = ({ roles, useStatus, onChange }) => {

    return (
        roles.map(role =>
            <RoleVisibility
                role={role}
                useStatus={useStatus}
                onChange={onChange}
                key={role.pk} />
        )
    )
}

const filled = (roles, status) => {

    const role_pks = roles.map(role => role.pk)

    let vis_count = 0

    status.visibilities.map(role_pk =>
        role_pks.includes(role_pk) && (vis_count++)
    )

    if (vis_count === roles.length && roles.length !== 0) {
        return "full"
    } else if (vis_count > 0) {
        return "partial"
    }

    return "empty"
}
