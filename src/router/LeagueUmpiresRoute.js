import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"
import AuthRedirect from "./authRedirect"

import ExistingUmpires from "league/main/umpires/existing/ExistingUmpires"
import PendingUmpires from "league/main/umpires/pending/PendingUmpires"

const LeagueUmpiresRoute = (rest) => {

    const { pk, active } = rest.computedMatch.params

    const User = useUser()[0]
    const { account_type } = User.user

    const redirect = AuthRedirect(User)

    return (
        <Route
            {...rest}
            render={props => {
                if (redirect) {
                    return redirect
                }

                switch (account_type) {
                    case ("manager"):
                        switch (active) {
                            case ("existing"):
                                return <ExistingUmpires {...props} />
                            case ("pending"):
                                return <PendingUmpires {...props} />
                            default:
                                return <Redirect to={`/league/${pk}/umpires/existing`} />
                        }
                    case ("umpire"):
                        return <Redirect to={`/league/${pk}/announcements/`} />
                    default:
                        return null
                }
            }}
        />
    )
}

export default LeagueUmpiresRoute