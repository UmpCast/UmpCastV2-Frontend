import React, { useState, useEffect, useContext } from 'react'

import UserContext, { DisplayContext } from "UserContext"

import { MyAlert } from "tools/Display"

const useUser = () => {
    return useContext(UserContext)
}

export const useDisplay = () => {
    return useContext(DisplayContext)
}

export const useMountEffect = (fun) => useEffect(fun, [])

export const useFetch = (request) => {

    const [Display, setDisplay] = useDisplay()

    const myState = useState(null)
    const setState = myState[1]

    useMountEffect(() => {
        setDisplay({ ...Display, isLoading: true })

        request()
            .then(setState)
            .catch(err => console.log(err))
            .finally(() => {
                setDisplay({ ...Display, isLoading: false })
            })
    })

    return myState
}

export async function ApiSubmit(myDisplay, request, buffer = true) {

    const [Display, setDisplay] = myDisplay
    let res = {}

    if (buffer) {
        setDisplay({ ...Display, isLoading: Display.isLoading + 1 })
    }

    return request()
        .then(payload => {
            res = { variant: "success", msg: "Success!" }

            return Promise.resolve(payload)
        })
        .catch(err => {
            res.variant = "danger"

            if (err.response) {
                const errors = err.response.data

                if (errors.non_field_errors) {
                    res.msg = errors.non_field_errors
                }

                return Promise.reject(errors)
            } else {
                res.msg = "An unknown error occured while performing request"

                return Promise.reject({})
            }
        })
        .finally(() => {

            let updatedDisplay = Display

            if (buffer) {
                updatedDisplay.isLoading = Math.max(Display.isLoading - 1, 0)
            }
            
            updatedDisplay.alert =
                <MyAlert variant={res.variant} className="mb-0">
                    {res.msg}
                </MyAlert>

            setDisplay(updatedDisplay)
        })
}

export default useUser