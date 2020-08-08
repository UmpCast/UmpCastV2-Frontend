import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"
import { useLeagueRedirect } from "./authRedirect"

import ExistingUmpires from "league/umpires/existing/ExistingUmpires"
import PendingUmpires from "league/umpires/pending/PendingUmpires"

const LeagueUmpiresRoute = (rest) => {

    const User = useUser()[0]
    const { user } = User
    
    const { pk, active } = rest.computedMatch.params

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