import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

import { myUrl, config } from "tools/Api"
import { useFetch } from "hooks"

export const authRedirect = (User) => {
    const { isAuthenticated, isConfigured } = User

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    } else if (!isConfigured) {
        return <Redirect to="/register/configure" />
    } else {
        return null
    }
}

export const useLeagueRedirect = (User, league_pk) => {
    const { user, token } = User
    const basicRedirect = authRedirect(User)

    const request = basicRedirect ? 
    () => Promise.resolve(basicRedirect) :
    () => axios.get(
        myUrl("api/user-league-status/"),
        config(
            token,
            {
                user: user.pk,
                league: league_pk,
                request_status: "accepted",
                page_size: 1
            }
        )
    )
    .then( payload => {
        if (payload.count === 0) {
            return "not_accepted"
        } else {
            return "accepted"
        }
    })

    return useFetch(request)
}

export default authRedirect