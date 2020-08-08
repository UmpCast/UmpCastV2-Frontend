import React, { Fragment } from "react"
import { useParams } from "react-router-dom"
import dayjs from "dayjs"

import useUser, { useFetch } from "hooks"
import basicApi from "promises"

import Header from "./CalendarHeader"
import Week from "./Week"

export default function Calendar() {

    const { user, token } = useUser()[0]
    const { date } = useParams()

    const week_games = useFetch(() => {
        let payload = null
        return basicApi(
            "api/user-league-status/",
            {
                token: token,
                params: {
                    user: user.pk,
                    league: 38,
                    request_status: "accepted",
                    page_size: 1
                }
            }
        ).then(res => {
            const uls = res.data.results[0]
            payload = { uls: uls }

        }).catch(() => payload)
    })[0]

    return null

    let week_start = getWeek(date)

    return (
        <Fragment>
            <Header week_start={week_start} />
            <Week week_start={week_start} />
        </Fragment>
    )
}

const getWeek = date => {
    let day = dayjs(date)

    if (!day.isValid()) {
        day = dayjs()
    }
    return day.startOf("week")
}
