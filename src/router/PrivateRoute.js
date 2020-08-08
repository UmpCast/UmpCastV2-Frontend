import React from "react";
import { Route } from "react-router-dom";

import useUser from "hooks"

import AuthRedirect from "./authRedirect"

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const redirect = AuthRedirect(useUser()[0])
    
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