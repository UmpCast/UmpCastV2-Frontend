import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import UserContext from './UserContext'
import PrivateRoute from "./components/common/PrivateRoute";

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

    const userState = {
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null
    }

    return (
        <UserContext.Provider value={useState(userState)}>
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
