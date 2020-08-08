import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"
import useLeagueRedirect from "./authRedirect"

import UmpireJoin from "league/umpireJoin/UmpireJoin"

const LeagueJoinRoute = (rest) => {

    const User = useUser()[0]

    const { pk } = rest.computedMatch.params

    const redirect = useLeagueRedirect(User, pk)[0]

    return (
        <Route
            {...rest}
            render={props => {
                
                switch(redirect){
                    case ("not_accepted"):
                        break
                    case ("accepted"):
                        return <Redirect to={`/league/${pk}/announcements/`} />
                    default:
                        return redirect
                }
                
                return <UmpireJoin {...props} />

            }}
        />
    )
}

export default LeagueJoinRoute