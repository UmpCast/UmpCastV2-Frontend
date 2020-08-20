import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "global/hooks"

const PublicRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated, isConfigured } = useUser()

    return (
        <Route
            {...rest}
            render={props => {
                if (isConfigured) {
                    return <Redirect to="/" />
                } else if (isAuthenticated) {
                    return <Redirect to="/register/configure" />
                } else {
                    return <Component {...props} />
                }
            }}
        />
    )
}

export default PublicRoute