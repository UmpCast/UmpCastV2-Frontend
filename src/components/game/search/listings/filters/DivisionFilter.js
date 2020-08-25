import React from 'react'

import FilterToggle from "./FilterToggle"

import { Form, Dropdown } from "react-bootstrap"

export default function DivisionFilter(props) {

    const { useFilters } = props


    return (
        <Dropdown>
            <FilterToggle
                title="All divisions" />
            <Dropdown.Menu
                className="mt-1 ump-centered-dropdown-menu">
                <ListDivisions
                    useFilters={useFilters} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

const ListDivisions = ({ useFilters }) => {
    const [filters, setFilters] = useFilters

    const { divisions } = filters

    const toggleDiv = (div_pk) => {

        const new_divisions = divisions.map(
            div => div.pk === div_pk ? {
                ...div,
                enabled: !div.enabled
            } : div
        )

        setFilters({
            ...filters,
            divisions: new_divisions,
            page: null
        })
    }

    const checkboxes = divisions.map(division => {
        const { title, hasVis, enabled, pk } = division

        const checkToggle = React.forwardRef(({ onClick }, ref) => (
            <Form.Check
                type="checkbox"
                label={title}
                checked={enabled}
                className="ml-3 mb-1 mt-1"
                disabled={!hasVis}
                onChange={e => { toggleDiv(pk); onClick(e) }}
                ref={ref}
                key={pk} />
        ))

        return <Dropdown.Toggle as={checkToggle}/>
    })

return checkboxes
} 
