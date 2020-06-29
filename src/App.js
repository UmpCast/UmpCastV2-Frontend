import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {Provider} from 'react-redux'
import store from "./store";



import {Login} from './components/accounts/Login'
import {Register} from './components/accounts/Register'

import {NoMatch} from './components/status/NoMatch'

import 'bootswatch/dist/cosmo/bootstrap.min.css';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
            </Fragment>
        </Provider>
    );
}

export default App;
