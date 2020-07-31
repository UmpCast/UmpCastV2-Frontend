import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"
import authRedirect from "./authRedirect"

import Urgent from "league/main/urgent/Urgent"

import UmpireJoin from "league/main/umpireJoin/UmpireJoin"

const LeagueDetailsRoute = (rest) => {

    const { pk, active } = rest.computedMatch.params
    const User = useUser()[0]
    const {user} = User

    const redirect = authRedirect(User)

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
                            case ("announcements"):
                            case ("calendar"):
                            case ("umpires"):
                                return <Redirect to={`/league/${pk}/umpires/existing`} />
                            case ("urgent"):
                                return <Urgent {...props} />
                            case ("settings"):
                                return <Redirect to={`/league/${pk}/settings/profile`} />
                            default:
                                return <Redirect to={`/league/${pk}/announcement`} />
                        }
                    case ("umpire"):
                        switch (active) {
                            case ("announcements"):
                                return null
                            case ("calendar"):
                            case ("join"):
                                return <UmpireJoin {...props} />
                            default:
                                return <Redirect to={`/league/${pk}/join`} />
                        }
                    default:
                        return null
                }
            }}
        />
    )
}

export default LeagueDetailsRoute