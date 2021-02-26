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

    const requests = {
        fetchLeague: (league_pk) => [
            "api/leagues/",
            {
                pk: league_pk
            }
        ]
    }

    const Api = useApi(requests)

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

export const useApi = (requests) => {
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

    if (requests)
        for (const [name, fun] of Object.entries(requests)) {
            ret[name] = (...vals) => (
                ret.Generic(...basicApi(...fun(...vals)))
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
            if(!res) return

            alertInfo.variant = "success"

            alertInfo.msg = ((code) => {
                switch (code) {
                    case 201:
                        return "Created!"
                    default:
                        return "Success!"
                }
            })(res.status)

            return res
        })
        .catch(err => {
            alertInfo.variant = "danger"

            const { response } = err

            if (!response) {
                alertInfo.msg = JSON.stringify(err)
            } else{
                alertInfo.msg = ((code) => {
                    switch (code) {
                        case 400:
                            const { non_field_errors } = response.data
                            if (non_field_errors)
                                alertInfo.msg = non_field_errors
                            return null
                        case 401:
                            return "Please sign-in first"
                        case 403:
                            return "You don't have permission!"
                        default:
                            return "Something unexpected went wrong!"
                    }
                })(response.status)
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
                        className="mb-0"
                        delay={3000}>
                        {alertInfo.msg}
                    </TimerAlert>
                )

            setDisplay(updatedDisplay)

        })
}

export default useUser