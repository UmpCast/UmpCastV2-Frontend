import React, { Fragment } from 'react'
import { useParams } from "react-router-dom"

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import LeagueBanner, { LeagueContainer } from "../LeagueBanner"
import SearchGame from "game/search/SearchGame"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-bootstrap"

export default function UrgentGame() {

    const { pk } = useParams()
    const { token } = useUser()[0]

    const league = useFetch(() =>
        basicApi("api/leagues/", { pk: pk, token: token })
            .then(res => res.data)
    )[0]

    return (
        <Fragment>
            <LeagueBanner pk={pk} active="urgent" league={league} />
            <LeagueContainer>
                <Card>
                    <Card.Header>
                        <span className="text-danger">
                            <FontAwesomeIcon icon={['fas', 'fire']} className="mr-2" />2 days left
                            </span>
                        <span className="float-right text-muted">
                            <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
                            <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
                            <FontAwesomeIcon icon={['fas', 'user-slash']} className="ml-1 fa-sm" />
                        </span>
                    </Card.Header>
                    <Card.Body className="pl-0">
                        <SearchGame
                            date="Aug 10"
                            time_start="3:30 PM"
                            time_end="5:30 PM"
                            title="Morgan-Gault vs. Agile"
                            division="Majors"
                            location="Mitchell Ballpark"
                            cast={cast} />
                    </Card.Body>
                </Card>
            </LeagueContainer>
        </Fragment>
    )
}

const cast = [
    {
        role: "Base",
        first_name: null,
        last_name: null
    },
    {
        role: "Plate",
        first_name: null,
        last_name: null
    },
    {
        role: "Scorekeeper",
        first_name: null,
        last_name: null
    }
]
