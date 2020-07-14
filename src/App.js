import React, { useState, useEffect } from "react"
import axios from "axios"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

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

import NoMatch from "./common/router/NoMatch"

import { Container } from "react-bootstrap"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"

import "bootswatch/dist/cosmo/bootstrap.min.css"
import "./style/App.css"

library.add(fab, fas, far)

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
            axios.get(myUrl("api/users/34/"), config(token))
                .then(res => {
                    setUser({
                        token: token,
                        isAuthenticated: true,
                        isConfigured: res.data.account_type !== "inactive",
                        user: res.data
                    })
                })
                .catch(err => console.log(err))
        }
    }, [setUser])

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
