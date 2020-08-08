import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"
import { useLeagueRedirect } from "./authRedirect"

import LeagueProfile from "../league/settings/LeagueProfile"
import Payouts from "../league/settings/Payouts"
import UmpireDefaults from "../league/settings/umpireDefaults/UmpireDefaults"
import DivisionsSettings from "../league/settings/divisions/DivisionsSettings"

const LeagueSettingsRoute = (rest) => {

    const { pk, active } = rest.computedMatch.params

    const User = useUser()[0]
    const { user } = User

    const redirect = useLeagueRedirect(User, pk)[0]

    return (
        <Route
            {...rest}
            render={props => {

                switch(redirect){
                    case ("accepted"):
                        break
                    case ("not_accepted"):
                        return <Redirect to={`/league/${pk}/join/`} />
                    default:
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