import React, { useState } from 'react'

import useLeague from "./hooks/useLeague"
import useGames from "./hooks/useGames"

import Loader from "common/components"

import SearchFilters from "./filters/SearchFilters"
import GameListing from "./GameListing"

import { Row, Container, ListGroup } from "react-bootstrap"

export default function SearchListings() {

    const useFilters = useState()

    const myLeague = useLeague(useFilters)
    const useHistory = useState([])

    const [history, setHistory] = useHistory
    const myGames = useGames(useFilters[0], setHistory)

    const [games] = myGames
    const [league] = myLeague

    return (
        <Loader dep={games}>
            <Container>
                <SearchFilters
                    useLeague={myLeague}
                    useFilters={useFilters} />

                <ListGroup>
                    <GamesFound games={games} />
                    <ListGames
                        games={games}
                        history={history}
                        league={league} />
                </ListGroup>
                <Row className="mt-3">
                    <NextPageLink
                        useGames={myGames}
                        useFilters={useFilters}
                        useHistory={useHistory} />
                </Row>
            </Container>
        </Loader>
    )
}

const GamesFound = ({ games }) => (
    <ListGroup.Item>
        <strong>{games.count} </strong>
        games found
    </ListGroup.Item>
)

const ListGames = ({ history, games, league }) => {

    const all_games = history.concat(games.results)

    return (
        all_games.map(game =>
            <GameListing
                game={game}
                key={game.pk} />
        )
    )
}

const NextPageLink = ({ useGames, useFilters, useHistory }) => {
    const [{ page_number, page_size, count, results }, setGames] = useGames
    const atEnd = count <= page_number * page_size

    const [filters, setFilters] = useFilters
    const [history, setHistory] = useHistory

    const nextPage = () => {
        setFilters({
            ...filters,
            page: page_number + 1
        })

        setGames({ count, results: [] })
        setHistory(history.concat(results))
    }

    if (atEnd) {
        return <p className="text-muted mx-auto">End of Games</p>
    } else {
        return (
            <p
                className="text-primary mx-auto"
                style={{ cursor: "pointer" }}
                onClick={nextPage}>
                <u>View more</u>
            </p>
        )
    }
}