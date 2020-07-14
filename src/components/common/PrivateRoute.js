import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "../../UserContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
    const User = useContext(UserContext)[0]

    const { isAuthenticated, isConfigured } = User
    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />
                } else if (!isConfigured) {
                    return <Redirect to="/register/configure" />
                } else {
                    return <Component {...props} />
                }
            }}
        />
    )
}

export default PrivateRoute