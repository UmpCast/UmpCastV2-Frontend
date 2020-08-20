import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "global/hooks"
import useLeagueRedirect from "./Redirect" 

import ExistingUmpires from "components/league/umpires/existing/ExistingUmpires"
import PendingUmpires from "components/league/umpires/pending/PendingUmpires"

const LeagueUmpiresRoute = (rest) => {

    const { pk, active } = rest.computedMatch.params

    const redirect = useLeagueRedirect(pk)
    const { user } = useUser()

    return (
        <Route
            {...rest}
            render={props => {

                switch (redirect) {
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