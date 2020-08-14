import React from "react";
import { Route, Redirect } from "react-router-dom";

import useLeagueRedirect from "./LeagueRedirect" 

const LeagueRoute = (rest) => {

    const { pk } = rest.computedMatch.params

    const redirect = useLeagueRedirect(pk)
    
    return (
        <Route
            {...rest}
            render={() => {

                switch(redirect){
                    case ("accepted"):
                        break
                    case ("not_accepted"):
                        return <Redirect to={`/league/${pk}/join/`} />
                    default:
                        return redirect
                }
                
                return <Redirect to={`/league/${pk}/umpires/`} />
            }}
        />
    )
}

export default LeagueRoute