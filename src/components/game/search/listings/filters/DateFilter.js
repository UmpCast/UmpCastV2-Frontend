import React from 'react'
import { Calendar } from "react-date-range"
import dayjs from "dayjs"

import FilterToggle from "./FilterToggle"

import { Dropdown } from "react-bootstrap"

export default function DateFilter(props) {

    const { useFilters } = props

    const [filters, setFilters] = useFilters

    const { start_date } = filters
    const now = dayjs()

    const handleSelect = (date) => {
        let new_date = dayjs(date)

        if (new_date < now)
            new_date = now

        setFilters({
            ...filters,
            start_date: new_date,
            page: null
        })
    }

    return (
        <Dropdown alignRight>
            <FilterToggle
                title={<ToggleTitle start_date={start_date}/>} />
            <Dropdown.Menu
                className="mt-1">
                <Calendar
                    minDate={new Date(now.toISOString())}
                    date={new Date(start_date.toISOString())}
                    onChange={handleSelect}
                />
            </Dropdown.Menu>
        </Dropdown>
    )
}

const ToggleTitle = ({ start_date }) => (
    <span>
        After
        <span className="text-primary ml-1">
            {start_date.format("MMM D")}
        </span>
    </span>
)
