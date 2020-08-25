import React from 'react'

import { Route, Redirect, Switch } from "react-router-dom"

import AuthRoute from "common/auth/AuthRoute"

import ExistingUmpires from "./existing/ExistingUmpires"
import PendingUmpires from "./pending/PendingUmpires"

export default function accountRouter() {
    return (
        <Switch>
            <AuthRoute
                path="/league/:pk/umpires/existing"
                is="league_manager"
                auth="league"
                component={ExistingUmpires} />

            <AuthRoute
                path="/league/:pk/umpires/pending"
                is="league_manager"
                auth="league"
                component={PendingUmpires} />
            
            <Route
                path="/league/:pk/umpires"
                render={props => (
                    <Redirect
                        to={`/league/${props.match.params.pk}/umpires/existing`} />
                )} />
        </Switch>
    )
}