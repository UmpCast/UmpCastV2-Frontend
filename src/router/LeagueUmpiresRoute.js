import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "UserContext"

import ExistingUmpires from "league/main/umpires/existing/ExistingUmpires"
import PendingUmpires from "league/main/umpires/pending/PendingUmpires"

const LeagueUmpiresRoute = (rest) => {

    const { isAuthenticated, isConfigured } = useContext(UserContext)[0]
    const {active} = rest.computedMatch.params

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
                        case ("existing"):
                            return <ExistingUmpires {...props} />
                        case ("pending"):
                            return <PendingUmpires {...props} />
                        default:
                            return 
                    }
                }
            }}
        />
    )
}

export default LeagueUmpiresRoute