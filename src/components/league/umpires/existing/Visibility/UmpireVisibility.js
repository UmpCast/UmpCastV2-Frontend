import React, { useState } from 'react'

import DivisionVisibility from "./DivisionVisibility"

export default function UmpireVisibility(props) {

    const { divisions, status, onChange } = props

    const useStatus = useState(status)

    const division_visibilities = divisions.map(division =>
        <DivisionVisibility
            division={division}
            useStatus={useStatus}
            onChange={onChange}
            key={division.pk} />
    )

    return (
        <div className={props.className}>
            {division_visibilities}
        </div>
    )
}
