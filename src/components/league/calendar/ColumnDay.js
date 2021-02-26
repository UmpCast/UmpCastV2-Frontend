import React from "react"
import dayjs from "dayjs"

import CalendarGame from "./Game"
import NoGame from "./NoGame"

import { Row, Col } from "react-bootstrap"

export default function Day(props) {

    const { games, date, handleDeleteGame } = props

    const today = dayjs().startOf("day")

    const isToday = date.isSame(today)

    const formatted_games = games.map(game =>
        <Row className="px-2 mb-2" key={game.pk}>
            <CalendarGame game={game} handleDeleteGame= {handleDeleteGame} />
        </Row>
    )

    return (
        <Col>
            <Row className="mb-2">
                <h3 className={`mx-auto ${isToday ? "text-primary" : null}`}>
                    <strong className="mr-2">{date.format("ddd")}</strong>
                    <span className="h4">{date.format("MMM DD")}</span>
                </h3>
            </Row>
            {games.length > 0 ?
                formatted_games :
                <NoGame date={date}>
                    No Games
                </NoGame>
            }
        </Col>
    )
}
