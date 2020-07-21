import React, { Fragment } from "react"

import CalendarGame from "./CalendarGame"
import NoGame from "./NoGame"

export default function Day(props) {

    const games = props.games.map(game =>
        <div className="row px-2">
            <CalendarGame {...game} />
        </div>
    )

    return (
        <Fragment>
            <div className="row mb-2">
                <h3 className="mx-auto">
                    <strong className="mr-2">{props.weekDay}</strong>
                    <span className="h4">{props.month} {props.day}</span>
                </h3>
            </div>
            {props.games.length === 0 ? <NoGame /> : games}
        </Fragment>
    )
}
