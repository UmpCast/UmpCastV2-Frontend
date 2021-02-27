import React, { useState } from "react";
import dayjs from "dayjs"

import useUser, { useApi, useMountEffect } from "common/hooks"

import Loader from "common/components"
import WeekBar from "./WeekBar";
import UpcomingGame from "./UpcomingGame";

import { ListGroup } from "react-bootstrap"

export default function Upcoming() {

    const { user } = useUser()
    const Api = useApi(requests)

    const [games, setGames] = useState()
    const [leagues, setLeagues] = useState()

    useMountEffect(() => {
        Promise.all([Api.fetchGames(user.pk), Api.fetchLeagues(user.pk)])
            .then(res => {
                setGames(res[0].data.results)
                setLeagues(res[1].data.results)
            })
    })

    return (
        <ListGroup>
            <ListGroup.Item>
                <h5 className="mb-0 font-weight-strong">
                    Your Signups
                </h5>
            </ListGroup.Item>
            <Loader dep={[games, leagues]}>
                <ListGames
                    games={games}
                    leagues={leagues} />
            </Loader>
        </ListGroup>
    )
}

const ListGames = ({ games, leagues }) => {
    const game_list = []

    let curr_week = null

    for (const game of games) {
        const game_week = dayjs(game.date_time).startOf("week")

        if (!game_week.isSame(curr_week)) {
            curr_week = game_week

            game_list.push(
                <WeekBar
                    week_start={curr_week}
                    key={curr_week.toISOString()} />
            )
        }

        const game_league = leagues.find(({ pk }) =>
            pk === game.league
        )

        game_list.push(
            <UpcomingGame
                game={game}
                league={game_league}
                key={game.pk} />
        )
    }

    return game_list
}

const requests = {
    fetchGames: (user_pk) => [
        "api/games/",
        {
            params: {
                user: user_pk,
                date_time_after: dayjs().toISOString(),
                page_size: 100
            }
        },
        "GET",
        false
    ],
    fetchLeagues: (user_pk) => [
        "api/leagues/",
        {
            params: {
                user: user_pk,
            }
        },
        "GET",
        false
    ]
}