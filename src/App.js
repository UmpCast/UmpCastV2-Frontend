import React, { useState, useEffect } from "react"
import axios from "axios"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import "bootswatch/dist/cosmo/bootstrap.min.css"

import UserContext from "./UserContext"
import { myUrl, config } from "./tools/Api"

import Header from "./Header"
import PrivateRoute from "./router/PrivateRoute"

import Game from "./game/main/Game"

import Login from "./account/login/Login"
import Register from "./account/login/Register"
import Configure from "./account/login/Configure"
import Dashboard from "./account/home/Dashboard"

import League from "./league/main/League"
import Calendar from "./league/calendar/Calendar"

import NoMatch from "./router/NoMatch"

import { tokenLogin } from "./account/promises"

import { Container } from "react-bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import * as icons from "./Icons"

import "./styles/App.css"

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
        // const token = localStorage.getItem("token")
        // if (token) {
        //     tokenLogin({ token: token })
        //         .then(payload => setUser(payload.user))
        //         .catch(err => console.log(err))
        // }
    }, [])

    return (
        <UserContext.Provider value={myUser}>
            <Router>
                <Header />
                <Container fluid className="p-0">
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/game/:id/" component={Game} />
                        <Route path="/league/:id/" component={League} />
                        <Route path="/register/configure/" component={Configure} />
                        <Route path="/register/" component={Register} />
                        <Route path="/login/" component={Login} />
                        <Route exact path="/calendar" component={Calendar} />
                        <Route component={NoMatch} />
                    </Switch>
                </Container>
            </Router>
        </UserContext.Provider>
    )
}

export default App;
