import React, { useRef, useState, useEffect, useContext } from 'react'
import axios from "axios"

import UserContext, { DisplayContext } from "UserContext"

import { myUrl, config } from "common/Api"
import { MyAlert } from "common/Display"

const useUser = (full = false) => {
    const myUser = useContext(UserContext)
    return full ? myUser : myUser[0]
}

export const useDisplay = () => {
    return useContext(DisplayContext)
}

export const useMountEffect = (fun, dep = []) => useEffect(fun, dep)

export const useFetch = (request, dep = []) => {

    const [Display, setDisplay] = useDisplay()

    const myState = useState()
    const setState = myState[1]

    useMountEffect(() => {
        setDisplay({ ...Display, isLoading: true })

        Promise.resolve(request())
            .then(setState)
            .finally(() => {
                setDisplay({ ...Display, isLoading: false })
            })
    }, dep)

    return myState
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
                .then(res => {
                    setDisplay({ ...display, isLoading: false })
                    return res
                })
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

export const ApiSubmit = myDisplay => request => {

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
                    <MyAlert
                        variant={alertInfo.variant}
                        className="mb-0">
                        {alertInfo.msg}
                    </MyAlert>
                )

            setDisplay(updatedDisplay)
        })
}

export default useUser