import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "UserContext"

import UserProfile from "account/settings/UserProfile"
import UserSecurity from "account/settings/UserSecurity"
import UserNotifications from "account/settings/UserNotifications"
import UserLeagues from "account/settings/UserLeagues"

const UserSettingsRoute = (rest) => {

    const { isAuthenticated, isConfigured } = useContext(UserContext)[0]
    const { active } = rest.computedMatch.params

    return (
        <Route
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                    return <Redirect to="/login" />
                } else if (!isConfigured) {
                    return <Redirect to="/register/configure" />
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