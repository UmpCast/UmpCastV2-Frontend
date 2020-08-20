import React, { useState } from 'react'

import { useTokenLogin, useMountEffect } from "global/hooks"

import Loader from "common/Components"

export default function AuthContainer({ children }) {

    const tokenLogin = useTokenLogin()

    const [fetched, setFetched] = useState(false)

    useMountEffect(() => {
        const token = localStorage.getItem("token")

        if (token) {
            tokenLogin(token)
                .catch(() => localStorage.removeItem("token"))
                .finally(() => setFetched(true))
        } else {
            setFetched(true)
        }
    })

    return (
        <Loader dep={fetched}>
            {children}
        </Loader>
    )
}
