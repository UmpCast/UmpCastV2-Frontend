import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import Urgent from "../league/main/urgent/Urgent"

import UserContext from "UserContext"

const LeagueRoute = (rest) => {

    const { isAuthenticated, isConfigured } = useContext(UserContext)[0]
    const {pk, active} = rest.computedMatch.params

    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />
                } else if (!isConfigured) {
                    return <Redirect to="/register/configure" />
                } else {
                    switch (active) {
                        case ("announcements"):
                        case ("calendar"):
                        case ("umpires"):
                            return <Redirect to={`/league/${pk}/umpires/existing`}/>
                        case ("urgent"):
                            return <Urgent {...props} />
                        case ("settings"):
                            return <Redirect to={`/league/${pk}/settings/profile`} />
                        default:
                            return <Redirect to={`/league/${pk}/umpires`} />
                    }
                }
            }}
        />
    )
}

export default LeagueRoute