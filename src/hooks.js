import React, { useState, useEffect, useContext } from 'react'

import UserContext from "UserContext"

import { MyAlert } from "tools/Display"

const useUser = () => {
    return useContext(UserContext)
}

export const useApi = (request) => {

    const [User, setUser] = useUser()

    const myState = useState(null)
    const setState = myState[1]

    useEffect(() => {
        setUser({ ...User, isLoading: User.isLoading + 1 })

        request()
            .then(res => {
                setState(res)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setUser({ ...User, isLoading: Math.max(User.isLoading - 1, 0) })
            })
    }, [])

    return myState
}

export async function ApiSubmit(myUser, request, buffer = true) {

    const [User, setUser] = myUser
    let res = {}

    if (buffer) {
        setUser({ ...User, isLoading: User.isLoading + 1 })
    }

    return request()
        .then(payload => {

            res = { variant: "success", msg: "Success!" }

            return Promise.resolve(payload)
        })
        .catch(err => {
            console.log(err)
            const error = err.response
            res.variant = "danger"

            if (error) {
                if (error.data.non_field_errors) {
                    res.msg = error.data.non_field_errors
                }

                return Promise.reject(error.data)
            } else {
                res.msg = "An unknown error occured while performing request"

                return Promise.reject({})
            }
        })
        .finally(() => {
            
            let updatedUser = User

            if(buffer){
                updatedUser.isLoading = Math.max(User.isLoading - 1, 0)
            }

            if (res.variant && res.msg) {
                updatedUser.alert =
                    <MyAlert variant={res.variant} className="mb-0">
                        {res.msg}
                    </MyAlert>
            }

            setUser(updatedUser)
        })
}


export default useUser