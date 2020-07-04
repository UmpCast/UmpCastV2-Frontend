import React, {Component, Fragment} from 'react'
import { HashRouter as Router, Route, Switch} from "react-router-dom"

import {Provider} from 'react-redux'
import store from "./store";

import {loadUser} from "./actions/auth";

import PrivateRoute from "./components/common/PrivateRoute";

import Header from "./components/Header";

import Login from './components/accounts/Login'
import Register from './components/accounts/Register'
import Configure from "./components/accounts/Configure";

import Dashboard from './components/home/Dashboard'

import Game from "./components/game/Game";

import NoMatch from './components/status/NoMatch'

import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';
import {Container} from "react-bootstrap";

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Router>
                        <Header/>
                        <Container fluid>
                            <Switch>
                                <PrivateRoute exact path="/" component = {Dashboard}/>
                                <PrivateRoute path="/game/:id" component={Game}/>
                                <Route path="/login" component = {Login}/>
                                <Route path="/register/configure" component={Configure}/>
                                <Route path="/register" component={Register}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Container>
                    </Router>
                </Fragment>
            </Provider>
        )
    }
}

export default App;
