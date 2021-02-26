import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import { useApi, useMountEffect } from "common/hooks"
import { TsRedirect } from "common/Api"

import Loader, { TimerAlert } from "common/components"
import SettingsContainer from "../SettingsContainer"

import TsDivisions from "./ts/TsDivisions"
import DivisionsCol from "./divisions/SortDivisions"

import { Row, Col, Button } from "react-bootstrap"
import { LeagueSyncFeatures } from 'components/league/settings/Text'

export default function DivisionsSettings() {

    const { pk } = useParams()
    const Api = useApi(requests)

    const useLeague = useState()

    const [league, setLeague] = useLeague

    useMountEffect(() => {
        Api.fetchLeague(pk)
            .then(res =>
                setLeague(res.data)
            )
    })

    return (
        <Loader dep={league}>
            <SettingsContainer league={league} active="divisions">
                <h3>
                    <strong>League Divisions</strong>
                </h3>
                <hr className="my-3" />
                <Row>
                    <Col lg={6} className="mb-4">
                        <h5 className="font-weight-bold">
                            Sync Divisions & Games
                        </h5>
                        <Button
                            variant="success rounded my-2 font-weight-bold"
                            href={TsRedirect(pk)}>
                            Sync
                        </Button>
                        <small className="form-text text-muted mb-3 mb-md-4">
                            <LeagueSyncFeatures />
                        </small>
                        <TsDivisions
                            useLeague={useLeague} />
                    </Col>
                    <DivisionsCol
                        useLeague={useLeague} />
                </Row>
            </SettingsContainer>
        </Loader>
    )
}

const requests = {
    fetchLeague: (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ]
}