import React from 'react'

import { CustomToggle } from "../../../../tools/Display"

import { Dropdown, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function SetMax() {
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                <div className="text-center">
                    <FontAwesomeIcon className="text-success mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-success mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-success mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                    <FontAwesomeIcon className="text-muted mr-1" icon={['fas', 'square']} />
                </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className="mt-2 py-0 px-2" style={{ "width": "250px" }}>
                <Form.Group className="my-0 text-center">
                    <small className="text-muted">Max 6</small>
                    <Form.Control type="range" min="0" max="10" step="1" custom />
                </Form.Group>
            </Dropdown.Menu>
        </Dropdown>
    )
}
