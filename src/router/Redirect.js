import React from "react"
import { Redirect } from "react-router-dom"

import useUser from "hooks"

export const useBasicRedirect = () => {
    const { isAuthenticated, isConfigured } = useUser()

    if (!isAuthenticated) {
        return <Redirect to="/login" />
    } else if (!isConfigured) {
        return <Redirect to="/register/configure" />
    } else {
        return null
    }
}

export default useBasicRedirect