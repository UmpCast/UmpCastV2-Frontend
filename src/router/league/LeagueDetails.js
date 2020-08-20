import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "global/hooks"
import useLeagueRedirect from "./Redirect" 

import Calendar from "components/league/calendar/Calendar"
import Urgent from "components/league/urgent/Urgent"

const LeagueDetailsRoute = (rest) => {

    const { pk, active } = rest.computedMatch.params

    const { user } = useUser()
    const redirect = useLeagueRedirect(pk)

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
                            case ("announcements"):
                            case ("calendar"):
                                return <Calendar {...props} />
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
                                return <Calendar {...props} />
                            default:
                                return <Redirect to={`/league/${pk}/announcements`} />
                        }
                    default:
                        return null
                }
            }}
        />
    )
}

export default LeagueDetailsRoute