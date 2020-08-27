import React from 'react'
import { Route, Switch } from "react-router-dom"

import AuthRoute from "common/auth/AuthRoute"

import Login from "./auth/login/Login"
import Register from "./auth/register/Register"
import Configure from "./auth/register/Configure"
import Home from "./home/Home"

import SettingsRouter from "./settings/SettingsRouter"

export default function accountRouter() {
    return (
        <Switch>
            <AuthRoute
                path="/register/configure"
                is="authenticated"
                not="configured"
                component={Configure} />

            <AuthRoute
                path="/login"
                is="public"
                not="authenticated"
                component={Login} />

            <AuthRoute
                path="/register"
                is="public"
                not="authenticated"
                component={Register} />

            <Route
                path="/settings"
                component={SettingsRouter} />

            <AuthRoute
                path="/"
                is="configured"
                auth="user"
                component={Home} />
        </Switch>
    )
}