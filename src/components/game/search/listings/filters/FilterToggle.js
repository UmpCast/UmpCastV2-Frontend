import React from 'react'

import { Dropdown } from "react-bootstrap"

const FilterToggle = ({ title }) => (
    <Dropdown.Toggle
        variant="light"
        className="rounded-pill bg-light text-muted py-1 mx-1"
        style={{ "border": "1px solid #E2E4E8", "lineHeight": 1.7 }}>
        {title}
    </Dropdown.Toggle>
)

export default FilterToggle