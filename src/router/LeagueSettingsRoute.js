import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "UserContext"

import LeagueProfile from "../league/main/settings/LeagueProfile"
import Payouts from "../league/main/settings/Payouts"
import UmpireDefaults from "../league/main/settings/umpireDefaults/UmpireDefaults"
import DivisionsSettings from "../league/main/settings/divisions/DivisionsSettings"

const LeagueSettingsRoute = (rest) => {

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
                        case ("profile"):
                            return <LeagueProfile {...props} />
                        case ("umpires"):
                            return <UmpireDefaults {...props} />
                        case ("divisions"):
                            return <DivisionsSettings {...props} />
                        case ("payouts"):
                            return <Payouts {...props} />
                        default:
                            return <Redirect to={`/league/${pk}/settings/profile`} />
                    }
                }
            }}
        />
    )
}

export default LeagueSettingsRoute