import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import AuthContainer from "global/AuthContainer"
import DisplayContainer from "global/DisplayContainer"
import Header from "global/header/Header"

import { UserContext, DisplayContext } from "global/Context"

import AccountRouter from "components/account/AccountRouter"
import CallbackRouter from "components/callback/CallbackRouter"
import GameRouter from "components/game/GameRouter"
import LeagueRouter from "components/league/LeagueRouter"

import "styles/Styles"

import { library } from "@fortawesome/fontawesome-svg-core"
import * as icons from "global/Icons"

library.add(...Object.values(icons))

const App = () => {

    const useUser = useState({
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null
    })

    const useDisplay = useState({
        isLoading: 0,
        alert: null
    })

    return (
        <Router>
            <UserContext.Provider value={useUser}>
                <DisplayContext.Provider value={useDisplay}>
                    <AuthContainer>
                        <Header />
                        <DisplayContainer>
                            <Switch>
                                <Route path="/league/:pk" component={LeagueRouter} />
                                <Route path="/game" component={GameRouter} />
                                <Route path="/callback" component={CallbackRouter} />
                                <Route path="/" component={AccountRouter} />
                            </Switch>
                        </DisplayContainer>
                    </AuthContainer>
                </DisplayContext.Provider >
            </UserContext.Provider>
        </Router >
    )
}

export default App;
