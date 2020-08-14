import React, { useState } from 'react'
import { useParams } from "react-router-dom";

import { useApi, useMountEffect } from "hooks"

import Loader from "common/Display"

import SettingsContainer from "league/settings/SettingsContainer"

import TsDivisions from "./Ts/TsDivisions"
import DivisionCard from "./Roles/DivisionRoles"

import { Row, Col, Button } from "react-bootstrap"
import { LeagueSyncFeatures } from 'league/settings/Text'

export default function Divisions() {

    const { pk } = useParams()

    const Api = useApi(fetchLeague)
    const useLeague = useState()

    const [league, setLeague] = useLeague

    useMountEffect(() => {
        Api.fetchLeague(pk)
            .then(res =>
                setLeague(res.data)
            )
    })

    league && (league.ts_divisions = temp_ts_divisions)

    return (
        <SettingsContainer league={league} active="divisions">
            <Loader dep={[league]}>
                <h3><strong>League Divisions</strong></h3>
                <hr className="my-3" />
                <Row>
                    <Col xs={6}>
                        <h5 className="font-weight-bold">
                            Sync Divisions & Games
                            </h5>
                        <Button variant="danger rounded my-2 font-weight-bold">
                            Unsync
                            </Button>
                        <small className="form-text text-muted">
                            <LeagueSyncFeatures />
                        </small>
                        <TsDivisions useLeague={useLeague} />
                    </Col>
                    <Col xs={6}>
                        <ListDivisions league={league} />
                    </Col>
                </Row>
            </Loader>
        </SettingsContainer>
    )
}

const ListDivisions = ({ league }) => (
    league.divisions.map(division =>
        <DivisionCard
            key={division.pk}
            division={division}
        />
    )
)

const fetchLeague = (league_pk) => [
    "api/leagues/",
    {
        pk: league_pk
    }
]

const temp_ts_divisions = [
    {
        title: 'AAA',
        path: 'Spring 2020 / Spring 2020 /',
        ts_id: 100,
        pk: 14
    },
    {
        title: 'PCL',
        path: 'Spring 2020 / Spring 2020 /',
        ts_id: 200,
        pk: null
    },
    {
        title: 'Majors',
        path: 'Spring 2020 / Spring 2020 /',
        ts_id: 300,
        pk: null
    },
]