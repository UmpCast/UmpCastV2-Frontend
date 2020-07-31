import React from "react";

import useUser from "hooks"
import { Route, Redirect } from "react-router-dom";

import AuthRedirect from "./authRedirect"

const LeagueRoute = (rest) => {

    const { pk } = rest.computedMatch.params

    const User = useUser()[0]
    const {user} = User

    const redirect = AuthRedirect(User)

    return (
        <Route
            {...rest}
            render={ () => {
                if (redirect) {
                    return redirect
                }
            
                switch(user.account_type){
                    case ("manager"):
                        return <Redirect to={`/league/${pk}/announcements/`} />
                    case ("umpire"):
                        if (user.leagues.includes(parseInt(pk))){
                            return <Redirect to={`/league/${pk}/announcements/`} />
                        } else {
                            return <Redirect to={`/league/${pk}/join`} />
                        }
                    default:
                        return null
                }
            }}
        />
    )
}

export default LeagueRoute