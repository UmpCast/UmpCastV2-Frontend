import React from 'react'

import LeagueFilter from "./LeagueFilter"
import DivisionFilter from "./DivisionFilter"
import DateFilter from "./DateFilter"

export default function Filters(props) {

    const { useLeague, useFilters } = props

    return (
        <div className="d-inline-flex justify-content-between w-100 mb-3">
            <div className="">
                <LeagueFilter
                    useLeague={useLeague} />
            </div>
            <div className="d-inline-flex">
                <DivisionFilter
                    useFilters={useFilters} />
                <DateFilter
                    useFilters={useFilters} />
            </div>
        </div>
    )
}
