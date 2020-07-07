import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom"
import axios from "axios"

import UserContext from './UserContext'
import PrivateRoute from "./components/common/PrivateRoute";
import { myUrl, config } from "./Api"

import Header from "./components/common/Header";

import Login from './components/accounts/Login'
import Register from './components/accounts/Register'
import Configure from "./components/accounts/Configure";

import Dashboard from './components/home/Dashboard'

import Game from "./components/game/Game";

import NoMatch from './components/status/NoMatch'

import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';
import { Container } from "react-bootstrap";

const App = () => {
    let userState = {
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null
    }

    let myUser = useState(userState)
    const setUser = myUser[1]

    // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get(myUrl('api/users/34/'), config(token))
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
                <Container fluid>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="/game/:id" component={Game} />
                        <Route path="/login" component={Login} />
                        <Route path="/register/configure" component={Configure} />
                        <Route path="/register" component={Register} />
                        <Route component={NoMatch} />
                    </Switch>
                </Container>
            </Router>
        </UserContext.Provider>
    )
}

export default App;
