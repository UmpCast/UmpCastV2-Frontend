import React, { Fragment, useState } from "react"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import customParseFormat from 'dayjs/plugin/customParseFormat'

import useUser, { useApi, useMountEffect } from "global/hooks"

import Loader from "common/Components"

import Header from "./Header"
import Week from "./Week"

dayjs.extend(customParseFormat, localizedFormat)

export default function Calendar() {

    const params = useParams()

    const { pk, date } = params

    const week_start = getWeekStart(date)

    const Api = useApi(fetchLeague, fetchUls, fetchGames)
    const User = useUser()

    const { user } = User

    const [league, setLeague] = useState()
    const [games, setGames] = useState()

    const [handleGames, setHandleGames] = useState(
        () => basicHandleGames(Api, setGames)
    )

    useMountEffect(() => {

        const myLeague = Api.fetchLeague(pk)

        myLeague.then(res =>
            setLeague(res.data)
        )

        const divVis = user.account_type === "umpire" ?
            Api.fetchUls(user.pk, pk)
                .then(res =>
                    res.data.results[0].division_visibilities
                )
            : myLeague.then(res =>
                res.data.divisions.map(div => div.pk)
            )

        divVis.then(vis => {
            const newHandleGames = handleGames(vis)

            setHandleGames(() => newHandleGames)
            newHandleGames(week_start)
        })
    })

    return (
        <Fragment>
            <Loader dep={[league]}>
                <Header
                    week_start={week_start}
                    handleGames={handleGames}
                    league={league} />
            </Loader>
            <Loader dep={[league, games]}>
                <Week
                    start={week_start}
                    games={games}
                    league={league} />
            </Loader >
        </Fragment>
    )
}

const getWeekStart = date => {
    let day = dayjs(date, "M-D-YYYY")
    
    if (!day.isValid()) {
        day = dayjs()
    }
    return day.startOf("week")
}

const basicHandleGames = (Api, setGames) => vis => week_start => {
    if (vis.length > 0) {
        Api.fetchGames(
            week_start, week_start.endOf("week"), vis)
            .then(res => setGames(res.data.results))
    } else {
        setGames([])
    }
}

const fetchLeague = (league_pk) => [
    "api/leagues/",
    {
        pk: league_pk
    }
]

const fetchUls = (user_pk, league_pk) => [
    "api/user-league-status/",
    {
        params: {
            user: user_pk,
            league: league_pk,
            request_status: "accepted",
            page_size: 1
        }
    }
]

const fetchGames = (start, end, div_vis) => [
    "api/games/",
    {
        params: {
            division__in: div_vis.toString(),
            date_time_after: start.toISOString(),
            date_time_before: end.toISOString(),
            page_size: 100
        }
    }
]