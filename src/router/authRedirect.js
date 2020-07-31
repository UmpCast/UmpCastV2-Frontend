import React from "react"
import { Redirect } from "react-router-dom"

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

export default authRedirect