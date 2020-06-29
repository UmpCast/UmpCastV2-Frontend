import React, {Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {Login} from './components/accounts/Login'
import {Register} from './components/accounts/Register'

import {NoMatch} from './components/status/NoMatch'

import {Layout} from "./components/Layout"

import './App.css';

function App() {
    return (
        <Fragment>
            <Layout>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
            </Layout>
        </Fragment>
    );
}

export default App;
