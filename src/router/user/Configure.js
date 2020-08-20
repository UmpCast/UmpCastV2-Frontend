import React from "react"
import { Route, Redirect } from "react-router-dom"

import useUser from "global/hooks"

import Configure from "components/account/auth/register/Configure"

export const ConfigureRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated, isConfigured } = useUser()

    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />
                } else if (isConfigured) {
                    return <Redirect to="/" />
                } else {
                    return <Configure {...props}/>
                }
            }}
        />
    )
}

export default ConfigureRoute