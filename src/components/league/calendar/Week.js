import React, { Fragment, createElement } from "react";
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

import Loader from "common/components"

import { expandGames } from "common/Utils"

import ListDay from "./ListDay"
import ColumnDay from "./ColumnDay"
import NoGame from "./NoGame"

import {Row, Col} from "react-bootstrap"

dayjs.extend(localizedFormat)

export default function Week(props) {

    const { league, start, games, handleDeleteGame } = props

    const { divisions } = league

    const weekGames = binByDay(expandGames(games, divisions))

    const weekViews = [ColumnDay, ListDay].map(
        component => weekGames.map(
            (day_games, index) => createElement(
                component,
                {
                    games: day_games,
                    date: start.add(index, "day"),
                    key: index,
                    handleDeleteGame: handleDeleteGame
                }
            )
        )
    )

    const now = dayjs()
    const end = start.add(7, "days")
    const thisWeek = start <= now && now < end

    return (
        <Fragment>
            <div className="d-none d-lg-block">
                <Row>
                    {weekViews[0]}
                </Row>
            </div>
            <div className="d-lg-none">
                <Col>
                    {weekViews[1]}
                </Col>
                <Loader dep={!thisWeek && games.length === 0}>
                    <NoGame>
                        No Games This Week
                    </NoGame>
                </Loader>
            </div>
        </Fragment>
    )
}

const binByDay = (games) => {
    const days = new Array(7)
    for (let i = 0; i < 7; i++) {
        days[i] = []
    }

    for (const game of games) {
        const game_time = dayjs(game.date_time)
        days[game_time.day()].push(game)
    }

    return days
}