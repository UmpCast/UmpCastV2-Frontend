import React, { useRef, useState, useEffect, useContext } from 'react'
import axios from "axios"

import { UserContext, DisplayContext } from "global/Context"

import { TimerAlert } from "common/components"

import { myUrl, config } from "common/Api"

export const useMountEffect = (fun, dep = []) => useEffect(fun, dep)

const useUser = (full = false) => {
    const myUser = useContext(UserContext)
    return full ? myUser : myUser[0]
}

export const useDisplay = () => {
    return useContext(DisplayContext)
}

export const useFetchLeague = (pk) => {

    const fetchLeague = (league_pk) => [
        "api/leagues/",
        {
            pk: league_pk
        }
    ]
    
    const Api = useApi(fetchLeague)

    const useLeague = useState()

    const [, setLeague] = useLeague

    useMountEffect(() => {
        Api.fetchLeague(pk)
            .then(res =>
                setLeague(res.data)
            )
    })
    
    return useLeague
}

export const useTokenLogin = () => {
    const Api = useApi()
    const [, setUser] = useUser(true)

    return (token) => {
        return (
            Api.Generic(() =>
                axios.get(
                    myUrl("api/users/me/"),
                    config(token)
                )
            )
                .then(res => {
                    const User = res.data

                    setUser({
                        isAuthenticated: true,
                        isConfigured: User.account_type !== "inactive",
                        user: User,
                        token: token
                    })

                    localStorage.setItem("token", token)
                })
        )
    }
}

export const useApi = (...requests) => {
    const { token } = useUser()
    const myDisplay = useDisplay()

    const [display, setDisplay] = myDisplay

    const ret = {}

    ret.Generic = (request, shouldLoad) => {

        setDisplay({ ...display, isLoading: shouldLoad })

        return (
            request()
                .finally(() =>
                    setDisplay({ ...display, isLoading: false })
                )
        )
    }

    const basicApi = (endpoint, values, method = "get", shouldLoad = true) => {
        const { pk, params, data } = values

        return [
            () => axios({
                method: method,
                url: myUrl(`${endpoint}${pk ? `${pk}/` : ""}`),
                ...config(token, params),
                data: data
            }),
            shouldLoad
        ]
    }

    for (const request of requests) {
        ret[request.name] = (...vals) => (
            ret.Generic(...basicApi(...request(...vals)))
        )
    }

    ret.Submit = ApiSubmit(myDisplay)

    return useRef(ret).current
}

const ApiSubmit = myDisplay => request => {

    const [display, setDisplay] = myDisplay

    setDisplay({ ...display, isLoading: true })

    let alertInfo = {}

    return request()
        .then(res => {
            alertInfo = { variant: "success", msg: "Success!" }

            return res
        })
        .catch(err => {
            alertInfo.variant = "danger"

            if (err.response) {
                const { non_field_errors } = err.response.data

                if (non_field_errors)
                    alertInfo.msg = non_field_errors
            } else {
                alertInfo.msg =
                    "An unknown error occured while performing request"
            }

            return Promise.reject(err)
        })
        .finally(() => {
            const updatedDisplay = { isLoading: false }

            const { variant, msg } = alertInfo

            if (variant && msg)
                updatedDisplay.alert = (
                    <TimerAlert
                        variant={alertInfo.variant}
                        className="mb-0">
                        {alertInfo.msg}
                    </TimerAlert>
                )

            setDisplay(updatedDisplay)
        })
}

export default useUser