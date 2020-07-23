import React, { useState, useEffect } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import "bootswatch/dist/cosmo/bootstrap.min.css"

import UserContext from "UserContext"

import PrivateRoute from "router/PrivateRoute"
import LeagueRoute from "router/LeagueRoute"
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

import { Container } from "react-bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import * as icons from "Icons"

import "styles/App.css"
import "styles/cursor.css"
import "styles/borders.css"
import "styles/lists.css"
import "styles/sizing.css"
import "styles/misc.css"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

library.add(...Object.values(icons));

const App = () => {
    let userState = {
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null,
        alert: null
    }

    const myUser = useState(userState)

    const [User, setUser] = myUser

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            tokenLogin({ token: token })
                .then(payload => setUser(payload.user))
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <UserContext.Provider value={myUser}>
            <Router>
                <Header />
                {User.alert}
                <Container fluid className="p-0 no-select">
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/register/configure/" component={Configure} />
                        <Route path="/register/" component={Register} />
                        <Route path="/login/" component={Login} />
                        <Route path="/calendar/" component={Calendar} />
                        <Route path="/games/" component={Search} />
                        <Route path="/game/:id/" component={GamePage} />

                        <LeagueRoute exact path="/league/:pk/" />
                        <LeagueRoute exact path="/league/:pk/:active/" />

                        <LeagueUmpiresRoute path = "/league/:pk/umpires/:active" />
                        <LeagueSettingsRoute path="/league/:pk/settings/:active" />

                        <UserSettingsRoute exact path="/settings" />
                        <UserSettingsRoute path="/settings/:active/" />
                        <Route component={NoMatch} />
                    </Switch>
                </Container>
            </Router>
        </UserContext.Provider>
    )
}

export default App;
