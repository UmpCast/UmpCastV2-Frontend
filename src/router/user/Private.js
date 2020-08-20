import React from "react";
import { Route } from "react-router-dom";

import useUser from "global/hooks"

import AuthRedirect from "./Redirect"

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const redirect = AuthRedirect(useUser())

    return (
        <Route
            {...rest}
            render={props => {
                if (redirect) {
                    return redirect
                }
                return  <Component {...props}/>
            }}
        />
    )
}

export default PrivateRoute