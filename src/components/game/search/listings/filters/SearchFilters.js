import React from 'react'

import LeagueFilter from "./LeagueFilter"
import DivisionFilter from "./DivisionFilter"
import DateFilter from "./DateFilter"

import { Row } from "react-bootstrap"

export default function Filters(props) {

    const { useLeague, useFilters } = props

    return (
        <Row className="mx-0 my-3">
            <LeagueFilter
                useLeague={useLeague} />
            <DivisionFilter
                useFilters={useFilters} />
            <DateFilter
                useFilters={useFilters} />
        </Row>
    )
}
