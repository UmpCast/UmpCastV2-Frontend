import React from "react";
import { Route, Redirect } from "react-router-dom";

import useLeagueRedirect from "./Redirect" 

import UmpireJoin from "components/league/join/JoinLeague"

const LeagueJoinRoute = (rest) => {

    const { pk } = rest.computedMatch.params

    const redirect = useLeagueRedirect(pk)

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