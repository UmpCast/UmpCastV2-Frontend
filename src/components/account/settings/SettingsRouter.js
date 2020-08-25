import React from 'react'

import { Redirect, Switch } from "react-router-dom"

import AuthRoute from "common/auth/AuthRoute"

import UserProfile from "./profile/UserProfile"
import UserSecurity from "./security/UserSecurity"
import UserNotifications from "./UserNotifications"
import UserLeagues from "./leagues/UserLeagues"

export default function SettingsRouter() {
    return (
        <Switch>
            <AuthRoute
                path="/settings/profile"
                is="configured"
                auth="user"
                component={UserProfile} />

            <AuthRoute
                path="/settings/security"
                is="configured"
                auth="user"
                component={UserSecurity} />

            <AuthRoute
                path="/settings/notifications"
                is="configured"
                auth="user"
                component={UserNotifications} />

            <AuthRoute
                path="/settings/leagues"
                is="configured"
                auth="user"
                component={UserLeagues} />
            
            <Redirect
                from="/settings"
                to="/settings/profile" />
        </Switch>
    )
}