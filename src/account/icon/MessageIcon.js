import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function MessageIcon(props) {
    return (
        <span
            className="d-none d-lg-block float-right secondary rounded border-muted px-1 text-muted">
            <FontAwesomeIcon icon={props.icon} />
        </span>
    )
}