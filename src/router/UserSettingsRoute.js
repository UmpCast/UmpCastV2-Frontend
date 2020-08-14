import React from "react";
import { Route, Redirect } from "react-router-dom";

import setUser from "hooks"
import authRedirect from "./Redirect"

import UserProfile from "account/settings/profile/UserProfile"
import UserSecurity from "account/settings/UserSecurity"
import UserNotifications from "account/settings/UserNotifications"
import UserLeagues from "account/settings/leagues/UserLeagues"

const UserSettingsRoute = (rest) => {

    const { active } = rest.computedMatch.params

    const User = setUser()[0]
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