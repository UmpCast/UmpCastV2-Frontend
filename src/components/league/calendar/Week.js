import React from "react";
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"

import CalendarDay from "./Day"

dayjs.extend(localizedFormat)

export default function Week(props) {

    const { league, start } = props

    const divisions = divsByPk(league.divisions)

    const games = props.games.map(game => ({
        ...game,
        division: divisions[game.division].title
    }))

    const formatted_week = binByDay(games).map((day_games, index) =>
        <CalendarDay
            games={day_games}
            date={start.add(index, "day")}
            key={index} />
    )

    return (
        <div className="row mt-4 mx-3">
            {formatted_week}
        </div>
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

const divsByPk = (divisions) => {
    const ret = {}

    for (const div of divisions) {
        ret[div.pk] = div
    }

    return ret
}