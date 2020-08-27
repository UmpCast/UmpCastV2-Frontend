import React, { useState } from 'react'
import { useParams } from "react-router-dom"

import { useApi, useDisplay, useMountEffect } from "common/hooks"
import { TsRedirect } from "common/Api"

import Loader, { TimerAlert } from "common/components"
import SettingsContainer from "../SettingsContainer"

import TsDivisions from "./ts/TsDivisions"
import DivisionsCol from "./divisions/SortDivisions"

import { Row, Col, Button } from "react-bootstrap"
import { LeagueSyncFeatures } from 'components/league/settings/Text'

export default function DivisionsSettings() {

    const { pk } = useParams()

    const Api = useApi(fetchLeague, buildDivisions)
    const [display, setDisplay] = useDisplay()

    const useLeague = useState()
    const [tsDivs, setTsDivs] = useState()

    const [league, setLeague] = useLeague

    useMountEffect(() => {
        Api.fetchLeague(pk)
            .then(res => {
                const league = res.data
                setLeague(league)

                const { api_key } = league

                if (!api_key) return Promise.reject()

                return Api.buildDivisions(pk, api_key)
            }).then(res => {
                const divs = res.data
                const { error } = divs

                if (error) {
                    setDisplay({
                        ...display,
                        alert: (
                            <TimerAlert
                                variant="danger"
                                className="mb-0">
                                {error}
                            </TimerAlert>
                        )
                    })
                } else {
                    setTsDivs(res.data)
                }
            })
    })

    return (
        <Loader dep={[league]}>
            <SettingsContainer league={league} active="divisions">
                <h3><strong>League Divisions</strong></h3>
                <hr className="my-3" />
                <Row>
                    <Col xs={6}>
                        <h5 className="font-weight-bold">
                            Sync Divisions & Games
                        </h5>
                        <Button
                            variant="success rounded my-2 font-weight-bold"
                            href={TsRedirect(pk)}>
                            Sync
                        </Button>
                        <small className="form-text text-muted">
                            <LeagueSyncFeatures />
                        </small>
                        <Loader dep={tsDivs}>
                            <TsDivisions
                                tsDivs={tsDivs}
                                useLeague={useLeague} />
                        </Loader>
                    </Col>
                    <DivisionsCol useLeague={useLeague} />
                </Row>
            </SettingsContainer>
        </Loader>
    )
}

const fetchLeague = (league_pk) => [
    "api/leagues/",
    {
        pk: league_pk
    }
]

const buildDivisions = (league_pk, key) => [
    `api/teamsnap/${league_pk}/build/`,
    {
        params: {
            api_key: key
        }
    }
]