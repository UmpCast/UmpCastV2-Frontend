import { useState } from "react"

import basicRedirect from "./Redirect"
import useUser, { useApi, useMountEffect } from "hooks"

export const useLeagueRedirect = (league_pk) => {
    const { user } = useUser()
    const Api = useApi(fetchUls)

    const [redirect, setRedirect] = useState(basicRedirect())

    useMountEffect(() => {
        if (!redirect)
            Api.fetchUls(user.pk, league_pk)
                .then(res => setRedirect(
                    res.data.count === 0 ? "not_accepted" : "accepted"
                ))
                .catch(() => setRedirect("not_accepted"))
    }, [])

    return redirect
}

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

export default useLeagueRedirect