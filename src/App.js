import React, { useState, useEffect } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import "bootswatch/dist/cosmo/bootstrap.min.css"

import UserContext from "./UserContext"

import Header from "./Header"
import PrivateRoute from "./router/PrivateRoute"

import Login from "./account/login/Login"
import Register from "./account/login/Register"
import Configure from "./account/login/Configure"
import Dashboard from "./account/home/Dashboard"
import UserSettings from "./account/settings/UserSettings"

import League from "./league/main/League"
import Calendar from "./league/calendar/Calendar"
import Search from "./game/search/Search"
import MainGame from "./game/main/MainGame"

import NoMatch from "./router/NoMatch"

import { tokenLogin } from "./account/promises"

import { Container } from "react-bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import * as icons from "./Icons"

import "./styles/App.css"
import "./styles/cursor.css"
import "./styles/borders.css"
import "./styles/lists.css"
import "./styles/sizing.css"
import "./styles/misc.css"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

library.add(...Object.values(icons));

const App = () => {
    let userState = {
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null
    }

    let myUser = useState(userState)
    const setUser = myUser[1]

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
                <Container fluid className="p-0">
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/register/configure/" component={Configure} />
                        <Route path="/register/" component={Register} />
                        <Route path="/login/" component={Login} />
                        <Route path="/calendar/" component={Calendar} />
                        <Route path="/games/" component={Search} />
                        <Route path="/game/:id/" component={MainGame} />
                        <Route path="/league/:id/" component={League} />
                        <Route exact path="/settings" component={UserSettings} />
                        <Route path="/settings/:subject/" component={UserSettings} />
                        <Route component={NoMatch} />
                    </Switch>
                </Container>
            </Router>
        </UserContext.Provider>
    )
}

export default App;
