import React from 'react'
import dayjs from "dayjs"

import Loader from "common/components"

import CalendarGame from "./Game"
import NoGame from "./NoGame"

import { Row } from "react-bootstrap"

export default function ListDay({ games, date, handleDeleteGame }) {

    const today = dayjs().startOf("day")

    const isToday = date.isSame(today)

    if (games.length === 0 && !isToday) {
        return null
    }

    const renderedGames = games.map(game =>
        <Row key={game.pk} className="mb-2">
            <CalendarGame game={game} handleDeleteGame={handleDeleteGame}/>
        </Row>
    )

    return (
        <div className="mb-4">
            <Row>
                <h3 className={`${isToday ? "text-primary" : null}`}>
                    <strong className="mr-2">{date.format("ddd")}</strong>
                    <span className="h4">{date.format("MMM DD")}</span>
                </h3>
            </Row>
            {renderedGames}
            <Loader dep={isToday && games.length === 0}>
                <NoGame date={date}>
                    No Games Today
                </NoGame>
            </Loader>
        </div>
    )
}