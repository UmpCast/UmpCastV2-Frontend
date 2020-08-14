import React, { useState } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import UserContext, { DisplayContext } from "UserContext"
import { useMountEffect } from "hooks"

import PrivateRoute from "router/PrivateRoute"
import LeagueRoute from "router/LeagueRoute"
import LeagueJoinRoute from "router/LeagueJoinRoute"
import LeagueDetailsRoute from "router/LeagueDetailsRoute"
import LeagueSettingsRoute from "router/LeagueSettingsRoute"
import LeagueUmpiresRoute from "router/LeagueUmpiresRoute"
import UserSettingsRoute from "router/UserSettingsRoute"

import Header from "account/header/Header"
import Login from "account/login/Login"
import Register from "account/login/Register"
import Configure from "account/login/Configure"
import Dashboard from "account/home/Dashboard"

import Calendar from "league/calendar/Calendar"
import Search from "game/search/Search"
import GamePage from "game/main/GamePage"

import NoMatch from "router/NoMatch"

import { tokenLogin } from "account/promises"

import Loader from "common/Display"

import { Container } from "react-bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import ClipLoader from "react-spinners/ClipLoader"
import * as icons from "Icons"

import "styles/App.css"
import "styles/cursor.css"
import "styles/borders.css"
import "styles/lists.css"
import "styles/sizing.css"
import "styles/misc.css"
import "styles/alignment.css"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import "bootswatch/dist/cosmo/bootstrap.min.css"

library.add(...Object.values(icons));

const App = () => {
    let userState = {
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null,
        isLoading: 0
    }

    const myUser = useState(userState)
    const [User, setUser] = myUser

    const myDisplay = useState({ isLoading: 0, alert: null })
    const Display = myDisplay[0]

    const [fetching, setFetching] = useState(true)
    useMountEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            tokenLogin({ token: token })
                .then(payload => {
                    setUser({ ...User, ...payload.user })
                })
                .finally(() => setFetching(false))
        } else {
            setFetching(false)
        }
    })

    if (fetching) {
        return null
    }

    return (
        <Router>
            <DisplayContext.Provider value={myDisplay}>
                <UserContext.Provider value={myUser}>
                    <Header />
                    {Display.alert}
                    <Container fluid className={`p-0 no-select ${Display.isLoading ? "ump-loading-container" : null}`}>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard} />

                            <Route path="/register/configure/" component={Configure} />
                            <Route path="/register/" component={Register} />
                            <Route path="/login/" component={Login} />

                            <Route path="/games/" component={Search} />
                            <Route path="/game/:pk/" component={GamePage} />

                            <LeagueRoute exact path="/league/:pk/" />
                            <LeagueJoinRoute exact path="/league/:pk/join/" />

                            <LeagueDetailsRoute exact path="/league/:pk/:active/" />
                            <Route path="/league/:pk/calendar/:date" component={Calendar} />

                            <LeagueUmpiresRoute path="/league/:pk/umpires/:active" />
                            <LeagueSettingsRoute path="/league/:pk/settings/:active" />

                            <UserSettingsRoute exact path="/settings" />
                            <UserSettingsRoute path="/settings/:active/" />

                            <Route component={NoMatch} />
                        </Switch>
                        <Loader dep={[Display.isLoading]}>
                            <div className="ump-loading-spinner">
                                <ClipLoader
                                    size={75}
                                    color={"#2375DF"} />
                            </div>
                        </Loader>
                    </Container>
                </UserContext.Provider>
            </DisplayContext.Provider >
        </Router >
    )
}

export default App;
