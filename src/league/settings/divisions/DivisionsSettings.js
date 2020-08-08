import React from 'react'
import { useParams } from "react-router-dom";

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import SubNav from "../../SubNav"
import SettingsNav from "../LeagueSettingsNav"

import TsDivisions from "./TsDivisions"
import DivisionCard from "./DivisionCard"

import { Row, Col, Button } from "react-bootstrap"

export default function Divisions() {

    const { pk } = useParams()
    const { token } = useUser()[0]

    const useLeague = useFetch(() =>
        basicApi("api/leagues/", { pk: pk, token: token })
            .then(res => res.data)
    )
    const [league] = useLeague

    const formatted_divisions = league ?
        league.divisions.map(division =>
            <DivisionCard
                key={division.pk}
                pk={division.pk}
                title={division.title}
                roles={division.roles}
            />
        ) : null

    league && (league.ts_divisions = temp_ts_divisions)

    return (
        <SubNav pk={pk} active="settings" league={league}>
            <SettingsNav pk={pk} active="divisions">
                <h3><strong>League Divisions</strong></h3>
                <hr className="my-3" />
                <Row>
                    <Col xs={6}>
                        <h5 className=""><strong>Sync Divisions & Games</strong></h5>
                        <Button variant="danger rounded my-2"><strong>Unsync</strong></Button>
                        <small className="form-text text-muted">
                            Umpcast will be able to transfer all existing divisions and games
                            from your account, while keeping up-to-date with any changes
                        </small>
                        {league && <TsDivisions useLeague={useLeague} />}
                    </Col>
                    <Col xs={6}>
                        {formatted_divisions}
                    </Col>
                </Row>
            </SettingsNav>
        </SubNav>
    )
}

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
