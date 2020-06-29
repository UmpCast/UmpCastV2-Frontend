import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {Provider} from 'react-redux'
import store from "./store";

import {loadUser} from "./actions/auth";

import PrivateRoute from "./components/common/PrivateRoute";

import Login from './components/accounts/Login'
import Register from './components/accounts/Register'

import Dashboard from './components/home/Dashboard'

import NoMatch from './components/status/NoMatch'

import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';

class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Fragment>
                    <Router>
                        <Switch>
                            <PrivateRoute exact path="/" component = {Dashboard}/>
                            <Route exact path="/login" component={Login}/>
                            <Route path="/register" component={Register}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </Router>
                </Fragment>
            </Provider>
        )
    }
}

export default App;
