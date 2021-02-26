import React from 'react'

import { Switch } from "react-router-dom"

import AuthRoute from "common/auth/AuthRoute"

import Announcements from "./announcements/Announcements"
import JoinLeague from "./join/JoinLeague"
import Calendar from "./calendar/Calendar"
import Urgent from "./urgent/Urgent"

import UmpiresRouter from "./umpires/UmpiresRouter"
import SettingsRouter from "./settings/SettingsRouter"

export default function LeagueRouter() {
    return (
        <Switch>
            <AuthRoute
                path="/league/:pk/join"
                is="configured"
                not="league_member"
                component={JoinLeague} />
            
            <AuthRoute
                path="/league/:pk/announcements"
                is="league_member"
                auth="league"
                component={Announcements} />
            
            <AuthRoute
                path="/league/:pk/calendar/:date"
                is="league_member"
                auth="league"
                component={Calendar} />

            <AuthRoute
                path="/league/:pk/calendar"
                is="league_member"
                auth="league"
                component={Calendar} />

            <AuthRoute
                path="/league/:pk/urgent"
                is="league_member"
                auth="league"
                component={Urgent} />

            <AuthRoute
                path="/league/:pk/umpires"
                is="league_member"
                auth="league"
                component={UmpiresRouter} />

            <AuthRoute
                path="/league/:pk/settings"
                is="league_manager"
                auth="league"
                component={SettingsRouter} />

            <AuthRoute
                path="/league/:pk"
                is="league_member"
                not="league_member"
                component={null} />

        </Switch>
    )
}