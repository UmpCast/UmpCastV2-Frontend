import React, { useState } from "react"
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import AuthContainer from "global/AuthContainer"
import DisplayContainer from "global/DisplayContainer"

import { UserContext, DisplayContext } from "global/Context"

import * as Routes from "router/Router"

import Header from "components/account/header/Header"
import Login from "components/account/auth/login/Login"
import Register from "components/account/auth/register/Register"
import Dashboard from "components/account/home/Dashboard"

import Calendar from "components/league/calendar/Calendar"
import Search from "components/game/search/Search"
import GamePage from "components/game/page/GamePage"

import NoMatch from "template/NoMatch"

import "styles/Styles"

import { library } from "@fortawesome/fontawesome-svg-core"
import * as icons from "global/Icons"

library.add(...Object.values(icons))

const App = () => {

    const useUser = useState({
        user: {},
        isAuthenticated: false,
        isConfigured: false,
        token: null
    })

    const useDisplay = useState({
        isLoading: 0,
        alert: null
    })

    return (
        <Router>
            <UserContext.Provider value={useUser}>
                <DisplayContext.Provider value={useDisplay}>
                    <AuthContainer>
                        <Header />
                        <DisplayContainer>
                            <Switch>
                                <Routes.Public exact path="/register/" component={Register} />
                                <Routes.Public path="/login/" component={Login} />
                                <Routes.Configure path="/register/configure/" />

                                <Routes.Private exact path="/" component={Dashboard} />

                                <Route path="/games/" component={Search} />
                                <Route path="/game/:pk/" component={GamePage} />

                                <Routes.League exact path="/league/:pk/" />
                                <Routes.LeagueJoin exact path="/league/:pk/join/" />

                                <Routes.LeagueDetails exact path="/league/:pk/:active/" />
                                <Route path="/league/:pk/calendar/:date" component={Calendar} />

                                <Routes.LeagueUmpires path="/league/:pk/umpires/:active" />
                                <Routes.LeagueSettings path="/league/:pk/settings/:active" />

                                <Routes.UserSettings exact path="/settings" />
                                <Routes.UserSettings path="/settings/:active/" />

                                <Route component={NoMatch} />
                            </Switch>
                        </DisplayContainer>
                    </AuthContainer>
                </DisplayContext.Provider >
            </UserContext.Provider>
        </Router >
    )
}

export default App;
