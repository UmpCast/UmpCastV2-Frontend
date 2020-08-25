import { useState, useEffect } from "react"
import dayjs from "dayjs"

import useUser, { useApi } from "common/hooks"

export default function useLeague(useFilters) {

    const [, setFilters] = useFilters

    const Api = useApi(fetchLeague, fetchUls)
    const User = useUser()

    const {accepted_leagues} = User.user

    const retLeague = useState(accepted_leagues[0].pk)

    const [league] = retLeague

    useEffect(() => {
        Promise.all([
            Api.fetchLeague(league),
            Api.fetchUls(User.user.pk, league)
        ]).then(res => {
            const { divisions } = res[0].data

            const uls = res[1].data.results[0]
            const divVis = uls.division_visibilities

            const divFilters = (
                divisions.map(({ title, pk }) => {
                    const hasVis = divVis.includes(pk)

                    return ({
                        enabled: hasVis,
                        hasVis,
                        title,
                        pk
                    })
                })
            )

            setFilters({
                divisions: divFilters,
                start_date: dayjs()                
            })
        })
    }, [league, Api, User, setFilters])

    return retLeague
}

const fetchLeague = (league_pk) => [
    "api/leagues/",
    {
        pk: league_pk
    },
    "GET",
    false
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