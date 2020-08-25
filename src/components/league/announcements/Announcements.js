import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import { useFetchLeague } from "common/hooks"

import Loader, { NotifsPage } from "common/components"
import Message from "./Message"
import NewMessage from "./NewMessage"

import LeagueContainer from "components/league/LeagueContainer"

import { Row, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Announcements() {

    const { pk } = useParams()

    const [league] = useFetchLeague(pk)

    const useShow = useState(false)
    const useReset = useState(false)

    const [, setShow] = useShow

    const fetchNotifs = page => [
        "api/league-notifications/",
        {
            params: {
                league: pk,
                page: page,
                page_size: 1
            }
        }
    ]

    return (
        <Loader dep={league}>
            <LeagueContainer league={league} active="announcements">
                <Row className="mx-0">
                    <Button
                        variant="primary rounded ml-auto"
                        onClick={() => setShow(true)}>
                        Add New
                        <FontAwesomeIcon
                            icon="bullhorn"
                            className="ml-2" />
                    </Button>
                </Row>
                <Row className="mx-0">
                    <NewMessage
                        useShow={useShow}
                        useReset={useReset} />
                </Row>
                <NotifsPage
                    fetchNotifs={fetchNotifs}
                    msgTemplate={Message}
                    useReset={useReset} />
            </LeagueContainer>
        </Loader>
    )
}