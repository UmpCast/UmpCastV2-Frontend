import React from 'react'
import { Switch } from "react-router-dom"

import AuthRoute from "common/auth/AuthRoute"

import Teamsnap from "./Teamsnap"

export default function CallbackRouter() {
    return (
        <Switch>
            <AuthRoute
                path="/callback/teamsnap"
                is="manager"
                auth="user"
                component={Teamsnap}/>
        </Switch>
    )
}
