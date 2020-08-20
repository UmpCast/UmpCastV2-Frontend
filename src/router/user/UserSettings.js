import React from "react";
import { Route, Redirect } from "react-router-dom";

import useUser from "global/hooks"
import authRedirect from "./Redirect"

import UserProfile from "components/account/settings/profile/UserProfile"
import UserSecurity from "components/account/settings/security/UserSecurity"
import UserNotifications from "components/account/settings/UserNotifications"
import UserLeagues from "components/account/settings/leagues/UserLeagues"

const UserSettingsRoute = (rest) => {

    const { active } = rest.computedMatch.params

    const User = useUser()
    const redirect = authRedirect(User)

    return (
        <Route

            {...rest}
            render={props => {
                if (redirect) {
                    return redirect
                } else {
                    switch (active) {
                        case ("profile"):
                            return <UserProfile {...props} />
                        case ("security"):
                            return <UserSecurity {...props} />
                        case ("notifications"):
                            return <UserNotifications {...props} />
                        case ("leagues"):
                            return <UserLeagues {...props} />
                        default:
                            return <Redirect to="/settings/profile" />
                    }
                }
            }}
/>
    )
}

export default UserSettingsRoute