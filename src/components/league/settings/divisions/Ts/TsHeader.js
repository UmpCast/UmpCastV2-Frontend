import React, { useState } from 'react'

import { useApi } from "common/hooks"

import { ListGroup, useAccordionToggle } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function TsHeader({ useLeague, useTsDivs, eventKey }) {

    const [league] = useLeague
    const [tsDivs, setTsDivs] = useTsDivs

    const Api = useApi(requests)

    const [collapsed, setCollapsed] = useState(true)

    const headerCallback = () => {

        const { pk, api_key } = league

        if (!api_key || tsDivs) {
            setCollapsed(!collapsed)
        } else {
            Api.buildDivisions(pk, api_key)
                .then(res =>
                    setTsDivs(res.data)
                ).finally(
                    setCollapsed(!collapsed)
                )
        }
    }

    const toggleOnClick = useAccordionToggle(
        eventKey,
        headerCallback,
    )

    return (
        <ListGroup.Item
            action
            onClick={toggleOnClick}
            className="p-2 border-0 d-inline-flex justify-content-between">
            Select Teamsnap Divisions
            <FontAwesomeIcon
                icon={`chevron-${collapsed ? "down" : "up"}`}
                className="mt-1" />
        </ListGroup.Item>
    )
}


const requests = {
    buildDivisions: (league_pk, key) => [
        `api/teamsnap/${league_pk}/build/`,
        {
            params: {
                api_key: key
            }
        }
    ]
}