import React from 'react'

import { Dropdown } from "react-bootstrap"

export default function UmpireVisibility(props) {
    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="light"
                className="rounded-pill bg-light text-muted py-0 debug mx-1"
                id="dropdown-basic"
                style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}
            >
                {props.name}
                    </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
