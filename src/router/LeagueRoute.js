import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "hooks"

import { useLeagueRedirect } from "./authRedirect"

const LeagueRoute = (rest) => {

    const User = useUser()[0]

    const { pk } = rest.computedMatch.params

    const redirect = useLeagueRedirect(User, pk)[0]

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
                
                return <Redirect to={`/league/${pk}/announcements/`} />
            }}
        />
    )
}

export default LeagueRoute