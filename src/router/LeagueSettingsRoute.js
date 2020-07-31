import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"
import AuthRedirect from "./authRedirect"

import LeagueProfile from "../league/main/settings/LeagueProfile"
import Payouts from "../league/main/settings/Payouts"
import UmpireDefaults from "../league/main/settings/umpireDefaults/UmpireDefaults"
import DivisionsSettings from "../league/main/settings/divisions/DivisionsSettings"

const LeagueSettingsRoute = (rest) => {

    const { pk, active } = rest.computedMatch.params

    const User = useUser()[0]
    const { user } = User

    const redirect = AuthRedirect(User)

    return (
        <Route
            {...rest}
            render={props => {
                if (redirect) {
                    return redirect
                }

                switch (user.account_type) {
                    case ("manager"):
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
                    default:
                        return null
                }
            }}
        />
    )
}

export default LeagueSettingsRoute